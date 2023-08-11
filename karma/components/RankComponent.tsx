"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RankComonentLoading from './RankComonentLoading';
import  yersterdayDate  from '../lib/yesterdayDate'


  const apiBaseUrl = 'https://lens-api.k3l.io';
  
  

const RankComponent: React.FC = () => {
    const [handle, setHandle] = useState('');
    const [rankData, setRankData] = useState<{ strategy: string; rank: number }[]>([]);
    const [yesterdayRankData, setYesterdayRankData] = useState<{ strategy: string; rank: number }[]>([]);
    const yesterday = yersterdayDate
    const total = 111742;
    const [loading, setLoading] = useState<boolean>(false);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
      try {
        const followshipResponse = await axios.get(`${apiBaseUrl}/profile/rank?handle=${handle}&strategy=followship`);
        const engagementResponse = await axios.get(`${apiBaseUrl}/profile/rank?handle=${handle}&strategy=engagement`);
        const influencerResponse = await axios.get(`${apiBaseUrl}/profile/rank?handle=${handle}&strategy=influencer`);
        const creatorResponse = await axios.get(`${apiBaseUrl}/profile/rank?handle=${handle}&strategy=creator`);
    
        const yesterdayFollowResponse = await axios.get(`${apiBaseUrl}/profile/rank?handle=${handle}&strategy=followship&date=${yesterday}`);
        const yesterdayEngagementResponse = await axios.get(`${apiBaseUrl}/profile/rank?handle=${handle}&strategy=engagement&date=${yesterday}`);
        const yesterdayInfluencerResponse = await axios.get(`${apiBaseUrl}/profile/rank?handle=${handle}&strategy=influencer&date=${yesterday}`);
        const yesterdayCreatorResponse = await axios.get(`${apiBaseUrl}/profile/rank?handle=${handle}&strategy=creator&date=${yesterday}`);
    
        if (
          followshipResponse.status === 200 &&
          engagementResponse.status === 200 &&
          influencerResponse.status === 200 &&
          creatorResponse.status === 200 &&
          yesterdayEngagementResponse.status === 200 &&
          yesterdayInfluencerResponse.status === 200 &&
          yesterdayCreatorResponse.status === 200 &&
          yesterdayFollowResponse.status === 200 
        ) {
          const rankData = [
            { strategy: 'Followship', rank: followshipResponse.data.rank },
            { strategy: 'Engagement', rank: engagementResponse.data.rank },
            { strategy: 'Influencer', rank: influencerResponse.data.rank },
            { strategy: 'Creator', rank: creatorResponse.data.rank },
          ];
    
          const yesterdayRankData = [
            { strategy: 'Followship', rank: yesterdayFollowResponse.data.rank },
            { strategy: 'Engagement', rank: yesterdayEngagementResponse.data.rank },
            { strategy: 'Influencer', rank: yesterdayInfluencerResponse.data.rank },
            { strategy: 'Creator', rank: yesterdayCreatorResponse.data.rank },
          ];
    
          setRankData(rankData);
          setYesterdayRankData(yesterdayRankData);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    const calculateRankChange = (currentRank: number, yesterdayRank: number): number => {
      const rankChange = yesterdayRank - currentRank;
      const rankChangePercentage = rankChange
      return rankChangePercentage;
    };

    

    return (
        <>
        <main className='w-full'>
            <div className='flex items-center justify-center my-10'>
        <Input 
        type="handle" 
        placeholder="Введите handle без @" 
        onChange={(e) => setHandle(e.target.value)}
        className='max-w-md m-2 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'
        />
        <Button 
        type="submit" 
        onClick={handleSubmit} 
        className=''
        >Search</Button>
        </div>
         {loading ? <RankComonentLoading /> : (<div className='max-w-full flex flex-wrap items-center justify-center gap-5 my-10 sm: m-auto  '> 
            {rankData.map((data, index) => {
            const yesterdayData = yesterdayRankData.find((yesterdayData) => yesterdayData.strategy === data.strategy);
            const rankChangePercentage = yesterdayData ? calculateRankChange(data.rank, yesterdayData.rank) : 0;
            const formattedRankChangePercentage = rankChangePercentage.toFixed(0);
            const arrowIcon = rankChangePercentage < 0 ? '↓' : rankChangePercentage > 0 ? '↑' : '';
    
            let changeColor = '';
            if (rankChangePercentage < 0) {
              changeColor = 'red';
            } else if (rankChangePercentage > 0) {
              changeColor = 'green';
            }
            const calculatePercentage = (rank:number, total:number) => {
            const percentage = (rank / total) * 100;
            return percentage.toFixed(1);
            }
    
            return (
                <Card 
                key={index}
                className='h-48 w-full object-cover md:h-full md:w-96 sm: w-96'
                >
                   <CardHeader>
                    <CardTitle className='self-center'>{data.strategy}</CardTitle>
                   </CardHeader>
                   <CardContent>
                    <div className='flex flex-wrap justify-between align-center sm: gap-2'>
                    <p>
                      Rank: {data.rank} 
                    </p>
                    <p style={{color: changeColor}}>
                      Change: {formattedRankChangePercentage} {arrowIcon}
                    </p>
                    <p className='text-sm font-mono font-thin text-slate-600'>
                      Top {calculatePercentage(data.rank, total)}%
                    </p>
                    </div>
                  </CardContent>
                </Card>
            );
          })}
          </div>)}
        </main>
        </>
      );
    };
    
    
    export default RankComponent;