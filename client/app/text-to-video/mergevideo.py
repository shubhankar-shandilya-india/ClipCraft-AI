from moviepy.editor import VideoFileClip, AudioFileClip
import os
def merge_audio_and_video():
    # video_path = "./ren.mp4"
    audio_path = "https://tts-result.s3.amazonaws.com/ru-RU/male/1714030722339.mp3"
    output_path = "./nnn.mp4"
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Construct the path to the video file
    video_path = os.path.join(script_dir, "ren.mp4")
    video_clip = VideoFileClip(video_path)
    audio_clip = AudioFileClip(audio_path)

    video_clip = video_clip.subclip(0, audio_clip.duration)

    video_clip = video_clip.set_audio(audio_clip)

    video_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')

    # Close the clips
    video_clip.close()
    audio_clip.close()
    print("abs")

# Merge audio and video
merge_audio_and_video()
