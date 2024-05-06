const textToSpeech = async (inputText: any) => {
  const API_KEY = process.env.ELEVENLABS_API_KEY;
  const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'xi-api-key': '46d9fa36f75b0dbc12265c79bc22c41a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: inputText,
      voice_settings: {
        stability: 1,
        similarity_boost: 1,
      },
    }),
  };

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, options);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const data = await response.json();
    return data;
  }
  catch (error: any) {
    console.error('Error:', error.message);
    throw error;
  }
};

export default textToSpeech;
