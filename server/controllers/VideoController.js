const catchAsync = require("../utils/catchAsync");
const { sendSuccess, sendError } = require("../utils/apiResponse.js");
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs').promises; // Using promises API for fs
const cloudinary = require('../utils/cloudinary');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

const videoUploader = catchAsync(async (req, res, next) => {
  try {
    const videoPath = req.file.path;
    const outputFolder = path.basename(videoPath, path.extname(videoPath));
    const outputDir = path.join('public/images', outputFolder);

    await fs.mkdir(outputDir);

    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .outputOptions(['-vf fps=5'])
        .output(path.join(outputDir, 'image-%d.png'))
        .on('end', () => {
          console.log('Images extracted successfully');
          resolve();
        })
        .on('error', (err) => {
          console.error('Error:', err);
          reject(err);
        })
        .run();
    });

    const files = await fs.readdir(outputDir);
    await Promise.all(files.map(async (file) => {
      const filePath = path.join(outputDir, file);
      const filename = path.basename(file, path.extname(file));
      try {
        const result = await cloudinary.uploader.upload(filePath, { folder: outputFolder,public_id: filename });
        // console.log('Image uploaded:', result.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }));

    await fs.rm(outputDir, { recursive: true });

    sendSuccess(res, 200, 'Video uploaded successfully at ' + outputFolder, null);
  } catch (error) {
    console.error('Error:', error);
    sendError(res, 500, 'An error occurred', error);
  }
});

module.exports = { videoUploader };
