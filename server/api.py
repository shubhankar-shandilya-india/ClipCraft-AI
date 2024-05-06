from flask import Flask, jsonify, request
from flask_cors import CORS
from moviepy.editor import VideoFileClip, AudioFileClip
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/getdata', methods=['POST'])
def get_data():
    data = request.json
    audio_url = data.get('audio_url')
    genre = data.get('genre')
    video_path = f"{genre}.mp4"
    
    audio_path = audio_url
    output_path = "../client/public/generated_video.mp4"
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    video_path = os.path.join(script_dir, f"{genre}.mp4")
    video_clip = VideoFileClip(video_path)
    audio_clip = AudioFileClip(audio_path)

    min_duration = min(video_clip.duration, audio_clip.duration)

    video_clip = video_clip.subclip(0, min_duration)
    audio_clip = audio_clip.subclip(0, min_duration)

    video_clip = video_clip.set_audio(audio_clip)

    video_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')

    # Close the clips
    video_clip.close()
    audio_clip.close()
    return jsonify('done')

if __name__ == '__main__':
    app.run(debug=True,port=8080)
