import { useEffect, useState } from 'react'


function App() {
  const [stories,setStories] = useState(null)
  const [error,setError] = useState(null)

  useEffect(()=>{
    async function fetchData(){
      try{
      const getTopStories = await fetch(' https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
      const topStoryData = await getTopStories.json();
      const topTwentyStories = topStoryData.splice(0,90)
     

      const storyData = topTwentyStories.map(async(storyId)=>{
        const getStoryData = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
        return await getStoryData.json();
      })

      const allStories = await Promise.all(storyData)
      setStories(allStories)
      setError(null)
    }catch(error){
      
      setError(error)
      setStories([])
    }
    }
    fetchData();
  },[])


  return (
    <>
    <div className='bg-orange-600 flex justify-between items-center'>
      <div className='flex items-center'>
      <span>
        <img className=""src="y18.svg" alt="image" />
        </span>
    <h1 className="text-1xl font-bold mx-3">Hacker News</h1>
    {error && <div>An error has occured</div>}
      <nav className='flex'>
      <a href="" className='mx-1'>new |</a>
      <a href="" className='mx-1'>past |</a>
      <a href="" className='mx-1'>comments |</a>
      <a href="" className='mx-1'>ask |</a>
      <a href="" className='mx-1'>show |</a>
      <a href="" className='mx-1'>job |</a>
      <a href="" className='mx-1'>submit </a> 
      </nav>
    </div>
    <div>
    <button className='ml-auto'>Login</button>
    </div>
    </div>
    {stories ? (
    <section className='grid gap-2 grid-cols-4 grid-rows-4 text-sm'>
    {stories.map((story) => (
      <article key={story.id} className='flex items-start gap-1 bg-blue-200 rounded-md pt-2'>
        <div className='text-center'>
        <span>{story.score}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
</svg>

        </div>
        <div>
        <a href={story.url} target='_blank' rel="noreferrer" className='underline font-bold'>
        {story.title}
       </a>
      {' '} <div className='text-xs mt-1'>by {story.by}</div>
      </div>
    </article>
    ))}
    </section>
    ) : ( 
      <div>Loading ...</div>
    )}
    </>
 )
} 

export default App



