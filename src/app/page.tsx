"use client";
import Image from "next/image";
import { greetings } from './greetings';
import { getGreetingForToday, saveGreetingForToday } from './lib/greetingUtils';
import { useEffect, useState } from "react";
import { getDayOfYear, getFlowersForToday, isChristmasDay, isValentinesDay, saveFlowersForToday } from './lib/flowerUtils';


export default function Home() {
  const [greeting, setGreeting] = useState<string>('');
  const [flowers, setFlowers] = useState<string>('/flowers/flower0.png');

  // Function to shuffle greetings and pick a random one
  const shuffleArray = (array: string[]) => array.sort(() => Math.random() - 0.5);

  // On component mount, check if the greeting for today is stored
  useEffect(() => {
    const storedGreeting = getGreetingForToday();
    const storedFlowers = getFlowersForToday();
  
    if (storedGreeting && storedFlowers) {
      setGreeting(storedGreeting);
      setFlowers(storedFlowers);
    } else {
      const randomGreeting = shuffleArray(greetings).slice(0, 1)[0];
      setGreeting(randomGreeting);
      saveGreetingForToday(randomGreeting);
  
      let image = "";
      if (isChristmasDay()) {
        image = "/special_flowers/christmasflowers.png";
      } else if (isValentinesDay()) {
        image = "/special_flowers/valentinesflowers.png";
      } else {
        const day = getDayOfYear() % 122;
        image = `/flowers/flower${day}.png`;
      }
  
      setFlowers(image);
      saveFlowersForToday(image);
    }
  }, []);

  // If flowers is null, return a placeholder or loading state
  if (flowers === null) {
    console.log("Null")
    return <div></div>; // Or use a loading spinner
  }

  console.log("Flowers: ", flowers)


  return (
    <div className="bg-[url('/backgrounds/flowery_letter.jpg')] h-screen w-screen bg-cover bg-no-repeat bg-center flex flex-col">
      <div className="flex justify-center items-center bg bg-black/50 backdrop-blur-md flex-wrap flex-col">
        <div className="pt-4 font-Great_Vibes text-white text-5xl md:text-6xl">Toria&lsquo;s Flowers</div>
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
      <div className="flex flex-col justify-center items-center pt-10 text-black">
        <p className="text-3xl md:text-4xl lg:text-5xl font-Satisfy">Good Morning Mommy,</p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-Satisfy px-4 text-center">{greeting}</p>
      </div>
      <p className="text-3xl text-black md:text-4xl lg:text-5xl font-Satisfy pt-8 text-center">Here are your daily flowers!</p>
      {flowers !== '' && 
        <div className="flex overflow-y-hidden justify-center items-top pt-6">
          <Image
                src={flowers}
                width={300}
                height={300}
                alt="Knocking on door"
                className="max-h-[60%] w-auto h-auto"
                priority={true}
              />
        </div>
      }
    </div>
  );
}
