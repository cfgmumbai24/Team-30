import scrapetube

videos = scrapetube.get_channel("UCVMJPRXrBIOFDBZEaF-_pEA")

# for video in videos:
#     print(video['videoId'])  #directly get the video id 
# print(type(videos))
list_of_video_id=[]
for video in videos:
    list_of_video_id.append(video['videoId'])  #directly get the video id 
    # print(video)