"use client";
// import React from "react";
// import { useEffect, useState } from "react";
import useSWR from 'swr'


const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function Home() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [processedData, setProcessedData] = useState([]);
  // useEffect(() => {
  //   console.log("useEffect");
  //   async function fetchData() {
  //     console.log("fetch data")
  //     try {
  //       const response = await fetch("/api/airtable");
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data);
  //         console.log("hello")
  //         setProcessedData(data.result.airtableData);
  //         setIsLoading(false); // Set isLoading to false when data is fetched
  //       } else {
  //         console.error("Error fetching data:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   fetchData();
  // }, []);
  // console.log(processedData);
  // with single argument
  const { data, isLoading, error } = useSWR('/api/airtable', fetcher)
  // console.log(data,isLoading)
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!isLoading){
    console.log(data.result.airtableData)
    if (data.result.airtableData.length === 0) {
      return <div>Failed to load</div>
    }
    const paragraphs = data.result.airtableData.map((item, index) => {

      return (
        <p key={index}>{item.Text}</p>
      );
    });
    return (
    
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold text-align-left">Gonzalo Pelenur</h1>

        {paragraphs}
      </main>
    );
  }
  
}
