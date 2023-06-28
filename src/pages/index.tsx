import { RecordIcon } from '@/components/icons';
import useMediaRecorder from '@/hooks/useMediaRecorder';
import { audioReader, transcriptions } from '@/utils';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const { startOrStop, audioBlob, audioBlobUrl, recording } = useMediaRecorder();

  // 处理blob文件
  useEffect(() => {
    if (audioBlob && audioBlob instanceof Blob) {
      // localWhisper(audioBlob); // 后端处理

      // 前端直接请求
      audioReader(audioBlob)
        .then((base64Data: string) => transcriptions(base64Data))
        .then(({ data }) => setMessage(data))
        .catch((err: Error) => console.error('转换为 base64 字符串时发生错误。', err));
    }
  }, [audioBlob]);

  // 处理blobURL
  useEffect(() => {
    if (audioBlobUrl && audioBlobUrl != '') {
      // playBlobUrl(audioBlobUrl, setMessage);
    }
  }, [audioBlobUrl]);

  const handlerRun = async (e: any) => {
    e.preventDefault();
    startOrStop();
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-2">
      <Head>
        <title>Recorder ASR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-6xl text-center">
          Recorder with <a className="text-blue-600 no-underline hover:underline focus:underline active:underline" href="#">Wechat!</a>
        </h1>

        <button
          className="mt-24 sm:mt-10 inline-flex justify-center w-full text-center rounded-xl bg-blue-600 px-8 py-2 font-medium text-white hover:bg-blue-600/80"
          onMouseDown={handlerRun}
          onMouseUp={handlerRun}
        >
          {recording ? <RecordIcon>正在录音...</RecordIcon> : '开始录音'}
        </button>

        <div className="w-full mt-4 mx-2 hover:text-blue-600 hover:border-blue-600">
          <p className="text-xl text-center cursor-pointer">{message}</p>
        </div>
        {/* <div className="w-full flex justify-center items-center">
          <img className="w-52 h-52" src='/Wisdom-Journey-Square.png' />
        </div> */}

        {/* <div className="flex flex-wrap items-start justify-start max-w-4xl mt-12">
          <a className="border border-solid border-gray-300 rounded-lg p-6 m-4 hover:text-blue-600 hover:border-blue-600">
            <h3 className="text-2xl mb-4">录制输出 &rarr;</h3>
            <p className="text-xl">{message}</p>
          </a>
        </div> */}
      </main>
    </div>
  )
}