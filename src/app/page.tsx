"use client";
import Image from "next/image";
import { greetings } from './greetings';
import { getGreetingForToday, saveGreetingForToday } from './lib/greetingUtils';
import { useEffect, useState } from "react";
import { getDayOfYear, getFlowersForToday, saveFlowersForToday } from './lib/flowerUtils';


export default function Home() {
  const [greeting, setGreeting] = useState<string>('');
  const [flowers, setFlowers] = useState<string>('')

  // Function to shuffle greetings and pick a random one
  const shuffleArray = (array: string[]) => array.sort(() => Math.random() - 0.5);

  // On component mount, check if the greeting for today is stored
  useEffect(() => {
    const storedGreeting = getGreetingForToday();
    const storedFlowers = getFlowersForToday();

    if (storedGreeting && storedFlowers) {
      setGreeting(storedGreeting); // Use the stored greeting
      setFlowers(storedFlowers)
    } else {
      // Pick a new greeting if no greeting is stored for today
      const randomGreeting = shuffleArray(greetings).slice(0, 1)[0];
      setGreeting(randomGreeting);
      saveGreetingForToday(randomGreeting); // Save the new greeting for today
      

      const day = getDayOfYear() % 120
      const image = "/flowers/flower" + day.toString() + ".png"
      setFlowers(image)
      saveFlowersForToday(image)
    }

    if(storedFlowers){

    }
  }, []);

  // If flowers is null, return a placeholder or loading state
  if (flowers === null) {
    return <div></div>; // Or use a loading spinner
  }


  return (
    <div className="bg-[url('/backgrounds/flowery_letter.jpg')] h-screen w-screen bg-cover bg-no-repeat bg-center">
      <div className="flex justify-center w-fit items-center bg bg-black/50 backdrop-blur-md flex-wrap">
        <div className="pt-2 font-Great_Vibes text-white text-5xl md:text-6xl">Toria&lsquo;s Flowers</div>
        <div className="flex justify-center p-4 pt-2 w-fit items-center gap-3 flex-wrap">
          <Image
            src="/images/knocking.jpg"
            width={300}
            height={300}
            alt="Knocking on door"
            className="w-[20%] min-w-[110px]"
          />
          <Image
            src="/images/kneeling.png"
            width={300}
            height={300}
            alt="Presenting flowers"
            className="w-[20%] min-w-[110px]"
          />
          <Image
            src="/images/closing_door.jpg"
            width={300}
            height={300}
            alt="Giving flowers"
            className="w-[20%] min-w-[110px]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-3xl font-Satisfy">Good Morning Mommy,</p>
        <p className="text-2xl font-Satisfy px-4 text-center">{greeting}</p>
      </div>
      <p className="text-3xl font-Satisfy pt-8 text-center">Here are your daily flowers!</p>
      {flowers !== '' && 
      <div className="flex justify-center items-center">
      <Image
            src={flowers}
            width={400}
            height={400}
            alt="Knocking on door"
            className="h-[30%] w-auto p-8"
            priority={true}
          />
          </div>
      }
    </div>
  );
}