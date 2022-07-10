1. Clone one of the example apps from ReactNative site:
https://github.com/Rahul-Pandey7/react-image-compressor

2. Upgrade this to the newest version of React
react-latest-version branch

3. Convert into using the latest NextJS framework
next-latest-version branch

4. Add a feature where after the image compression, the resulting image will be
uploaded automatically to an S3 bucket. (You may use a plugin)

main branch
5. Create a Postman collection that will show these images can be downloaded from a
RESTful API.
main branch

Restful APIs
GET: http://localhost:5000/api/compressor .
Get all converted images.

GET: http://localhost:5000/api/compressor/show?id='62c9af94cb339ad2b14e66fc'
Get individual image.

GET: http://localhost:5000/api/compressor/pagination?page=3&limit=2
Get paginated images

{
    "next": {
        "page": 4,
        "limit": 2
    },
    "previous": {
        "page": 2,
        "limit": 2
    },
    "results": [
        {
            "_id": "62c9b6ddabc89dd7a10882a3",
            "originalName": "kingtiger.PNG",
            "originalSize": "137558",
            "originalFileType": "image/png",
            "uploadName": "1657386717929-kingtiger.PNG",
            "originalURL": "http://localhost:5000/uploads/original/1657386717929-kingtiger.PNG",
            "compressedURL": "http://localhost:5000/uploads/compressed/1657386717929-kingtiger.PNG",
            "createdAt": "2022-07-09T17:11:57.946Z",
            "__v": 0,
            "s3BucketURL": "https://autumn-node.s3.eu-central-1.amazonaws.com/1657386717929-kingtiger.PNG"
        },
        {
            "_id": "62c9b6dfabc89dd7a10882a5",
            "originalName": "kingtiger.PNG",
            "originalSize": "137558",
            "originalFileType": "image/png",
            "uploadName": "1657386719137-kingtiger.PNG",
            "originalURL": "http://localhost:5000/uploads/original/1657386719137-kingtiger.PNG",
            "compressedURL": "http://localhost:5000/uploads/compressed/1657386719137-kingtiger.PNG",
            "createdAt": "2022-07-09T17:11:59.154Z",
            "__v": 0,
            "s3BucketURL": "https://autumn-node.s3.eu-central-1.amazonaws.com/1657386719137-kingtiger.PNG"
        }
    ]
}

POST: http://localhost:5000/api/compressor/upload
Upload image for compressing.


