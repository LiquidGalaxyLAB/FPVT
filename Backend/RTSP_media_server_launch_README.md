Video media server start instructions:


1. sudo docker pull ullaakut/rtspatt


2. docker run -e INPUT="/tmp/video_footage.avi" -e RTSP_ADDRESS=0.0.0.0 -e RTSP_PORT=18554 -v "/home/cc/Documents/Test/Backend:/tmp" -p 18554:18554 ullaakut/rtspatt

