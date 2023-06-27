import { localWhisper } from '@/utils';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-2">
      <Head>
        <title>Upload</title>
      </Head>

      <main className="border border-solid border-gray-300 rounded-lg p-6 m-4">
        <div className="border-b border-gray-300 pb-5">
          <input type="file" onChange={event => localWhisper(event.target.files).then(({ data }) => setMessage(data))} />
        </div>
        <div className="flex flex-wrap items-start justify-start max-w-4xl mt-4 hover:text-blue-600 hover:border-blue-600">
          <p className="text-xl">{message}</p>
        </div>
      </main>
    </div>
  )
}