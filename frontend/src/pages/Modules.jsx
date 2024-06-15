import React, { useEffect, useState } from 'react'
import Chapter from '../components/Chapter';
import Navigation from '../components/Navigation';
import Progress from '../components/Progress';
import Congratulations from '../components/Congratulations';
import { apiConnector } from '../services/apiConnector';
import toast from 'react-hot-toast';

const chapters = [
  { title: 'Chapter 1', text: 'This is the content of Chapter 1.' },
  { title: 'Chapter 2', text: 'This is the content of Chapter 2.' },
  { title: 'Chapter 3', text: 'This is the content of Chapter 3.' },
  // Add more chapters as needed
];

const Modules = ({ coins, addCoins }) => {
    const [currentChapter, setCurrentChapter] = useState(0);
    const moduleTitle = "Module 1";

  useEffect(() => {
    // Award coins when the module is completed
    if (currentChapter === chapters.length) {
      addCoins(10);

      const sendModuleComplete = async(req,res)=>{
        const data = {
            flag : true,
            moduleName: moduleTitle,
        }

        const toastId = toast.loading("Loadinng ...");
        try {
            const addModule = await apiConnector("GET", "http://localhost:4000/updatePoints",data)

            if(!addModule.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Module Added to Completion Successfully");
          } catch (error) {
            console.log("Error in adding module completion")
            toast.error("Could Not Send Data");
          }
        toast.dismiss(toastId);
      }

      
    }
  }, [currentChapter]);

    const handleNext = () => {
      setCurrentChapter((prev) => {
        console.log('Next Chapter:', prev + 1);
        if (prev < chapters.length) {
          return prev + 1;
        }
        return prev;
      });
    };
  
    const handlePrevious = () => {
      setCurrentChapter((prev) => {
        console.log('Previous Chapter:', prev - 1);
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      });
    };
  
    return (
      <div>
        <h1>{moduleTitle}</h1>
        <Progress currentChapter={currentChapter} totalChapters={chapters.length} />
        {currentChapter < chapters.length ? (
          <>
            <Chapter content={chapters[currentChapter]} />
            <Navigation
              currentChapter={currentChapter}
              totalChapters={chapters.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </>
        ) : (
          <Congratulations />
        )}
      </div>
    );
}

export default Modules