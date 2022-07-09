const sharp = require("sharp");
const fs = require('fs');
const AWS = require('aws-sdk');
let CompressorSchema = require('../model/compressor.model');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
require('dotenv').config();
let newSchema;

exports.index = async (req, res) => {
    try {
        const compressors = await CompressorSchema.find();
        res.status(200).send(compressors);
    } catch (error) {
        res.status(400).send(err);
    }
}

exports.pagination = (req, res) => {
    res.json(res.paginatedResults);
}

exports.show = async (req, res) => {
    try {
        const id = req.query.id;
        const compressors = await CompressorSchema.findById(id);
        res.status(200).send(compressors);
    } catch (error) {
        res.status(400).send(err);
    }
}
exports.upload = async (req, res) => {

    const { buffer, originalname, size, mimetype } = req.file;

    //original image
    const uploadName = `${Date.now()}-${originalname}`
    const originalPath = `uploads/original/${uploadName}`;
    fs.writeFileSync(originalPath, req.file.buffer);

    // compressed image
    const compressedPath = `uploads/compressed/${uploadName}`;
    await sharp(buffer)
        .webp({ quality: 20 })
        .toFile(compressedPath);

    const link = `${process.env.API_URL}/${compressedPath}`;
    const contentType = req.file.mimetype;

    //upload s3 bucket
    uploadFileIntoS3(compressedPath, contentType, uploadName);

    //add database
    const Schema = new CompressorSchema({
        originalName: originalname,
        originalSize: size,
        originalFileType: mimetype,
        uploadName: uploadName,
        originalURL: process.env.API_URL + originalPath,
        compressedURL: process.env.API_URL + compressedPath,
    });
    newSchema = await Schema.save();
    console.log(newSchema)
    return res.json({ link });
}

const uploadFileIntoS3 = (compressedPath, contentType, uploadName) => {
    fs.readFile(compressedPath, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: process.env.AWSBucketName,
            Key: uploadName,
            ContentType: contentType,
            Body: data
        };
        s3.upload(params, async (s3Err, data) => {
            if (s3Err) throw s3Err
            console.log('File uploaded successfully at -> ', data.Location);
            newSchema.s3BucketURL = data.Location;
            await newSchema.save();

        });
    });
};
const downloadFileFromS3 = async (uploadName) => {
    const params = {
        Bucket: process.env.AWSBucketName,
        Key: uploadName,
    };
    const downloadPath = `download/${uploadName}`;
    let file = fs.createWriteStream(downloadPath);

    await s3.getObject(params).createReadStream()
        .on('end', () => {
            console.log("File successfully downloaded!");
        })
        .on('error', (error) => {
            console.log(error)
        }).pipe(file);
};

//check s3 bucket.
// downloadFileFromS3("1657389699735-kingtiger.PNG")
