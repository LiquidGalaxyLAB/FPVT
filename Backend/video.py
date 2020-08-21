import cv2
import time

url = "rtsp://0.0.0.0:18554/live.sdp"
camera = cv2.VideoCapture(url)
camera.set(cv2.CAP_PROP_FPS, 1)

a = 1

while True:
    ret, frame = camera.read()

    print(ret)
    print(frame)
    cv2.imwrite(f"./Api/templates/static/images/Test_img/image1.jpg", frame)
    cv2.imwrite(f"./Api/templates/static/images/Test_img/image2.jpg", frame)
    time.sleep(120)
    a+=1


