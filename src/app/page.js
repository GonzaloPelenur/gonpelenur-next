"use client";
import useSWR from 'swr'
import Image from 'next/image'


const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function Home() {
  const { data, isLoading, error } = useSWR('/api/airtable', fetcher)
  // console.log(data,isLoading)
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!isLoading){
    // console.log(data.result.airtableData)
    console.log(data)
    if (data.result == "") {
      return <div>Failed to load</div>
    }
    const paragraphs = data.result.airtableData.map((item, index) => {

      return (
        <p key={item.ID}>{item.Text}</p>
      );
    });
    return (
      <main className="flex flex-wrap min-h-screen p-4 md:p-24 items-start justify-center">
        <div className="flex flex-col md:flex-row items-center w-full max-w-4xl">
          <div className="w-full md:w-auto md:flex-none mb-4 md:mb-0">
            <Image
              src="/headshot_final.png"
              width={300}
              height={300}
              alt="Picture of the author"
              className="rounded-lg"
            />
          </div>
          <div className="flex-grow space-y-4 ml-0 md:ml-12">
            <h1 className="text-2xl md:text-4xl font-bold">Gonzalo Pelenur</h1>
            {paragraphs}
          </div>
        </div>
      </main>
    );
  }
  
}
