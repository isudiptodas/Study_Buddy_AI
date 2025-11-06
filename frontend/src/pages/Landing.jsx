import { useEffect, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSparklesSharp } from "react-icons/io5";
import { toast } from "sonner";
import axios from "axios";
import { MdAccountCircle } from "react-icons/md";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

function Landing() {

    const [course, setCourse] = useState(null);
    const [club, setClub] = useState(null);
    const [courseVisible, setCourseVisible] = useState(false);
    const [clubVisible, setClubVisible] = useState(false);
    const [team, setTeam] = useState(null);
    const [personality, setPersonality] = useState(null);
    const [booksRead, setBooksRead] = useState(null);
    const [hobbyHours, setHobbyHours] = useState(null);
    const [name, setName] = useState(null);
    const [found, setFound] = useState([]);
    const navigate = useNavigate();

    const clubs = [
        'Debate Club',
        'Literature Society',
        'Music Society',
        'Sports Club',
        'Research Club',
        'Drama Club',
        'Coding Club',
        'Photography Club',
    ];

    const courses = [
        'Computer Science',
        'Mechanical Engineering',
        'Electrical Engineering',
        'Psychology',
        'English Literature',
        'Physics',
        'Media Studies',
        'Economics'
    ];

    const findBuddy = async () => {

        if (!name || !course || !club) {
            toast.error("Mandatory fields required");
            return;
        }

        if (!(team >= 1 && team <= 10)) {
            toast.error("Team preference must be between 1 - 10");
            return;
        }

        if (!(personality >= 1 && personality <= 10)) {
            toast.error("Personality type must be between 1 - 10");
            return;
        }

        if (!(booksRead >= 1 && booksRead <= 50)) {
            toast.error("Books number must be between 1 - 50");
            return;
        }

        if (!(hobbyHours >= 1 && hobbyHours <= 20)) {
            toast.error("Hobby hours must be between 1 - 20");
            return;
        }

        const payload = {
            "Club top1": String(club).trim(),
            "Teamwork preference": Number(team),
            "Introversion extraversion": Number(personality),
            "Books read past year": Number(booksRead),
            "Weekly_hobby_hours": Number(hobbyHours),
            "course": String(course).trim(),
            "name": String(name).trim()
        };

        const id = toast.loading("Finding your perfect buddy...");

        try {
            //console.log(payload);
            const res = await axios.post('http://localhost:5000/find-buddy?top_k=5', payload);
            //console.log(res.data);
            toast.dismiss(id);
            setFound(res.data);
            toast.success("Found matches for you");

        } catch (err) {
            console.log("error ->", err)
        }
        finally {
            toast.dismiss(id);
        }

    }

    return (
        <>
            <nav className={`w-full h-auto py-4 md:py-6 shadow-lg rounded-b-4xl flex justify-center lg:justify-between lg:px-10 items-center`}>
                <p className={`font-Catchye text-sm xl:text-xl cursor-pointer tracking-widest`}>Study Buddy AI</p>

                <div className={`w-auto hidden lg:flex justify-center items-center gap-7`}>
                    <span className={`w-auto pb-3 border-b-white hover:border-b-fuchsia-600 border-b-2 duration-200 ease-in-out font-Montserrat text-lg cursor-pointer text-black`}>About Us</span>
                    <span className={`w-auto pb-3 border-b-white hover:border-b-fuchsia-600 border-b-2 duration-200 ease-in-out font-Montserrat text-lg cursor-pointer text-black`}>Features</span>
                    <span className={`w-auto pb-3 border-b-white hover:border-b-fuchsia-600 border-b-2 duration-200 ease-in-out font-Montserrat text-lg cursor-pointer text-black`}>Privacy Policy</span>
                </div>
            </nav>

            <main className={`w-full h-auto px-5 md:px-16 flex flex-col justify-start items-center pt-10 md:pt-14`}>
                <h1 className={`w-full text-start font-bold font-Venus-Rising text-3xl lg:text-5xl leading-12 lg:leading-16 md:text-center`}>Find Your Perfect Study Partner</h1>
                <p className={`w-full text-start font-Montserrat mt-5 text-[12px] md:text-sm xl:text-lg md:text-center lg:px-28 md:mt-8`}>Our AI-based Buddy Recommendation System helps students connect with compatible study partners based on interests, teamwork styles, and personalities.</p>
                <div className={`w-full flex justify-start items-start md:justify-center gap-3 mt-4`}>
                    <p className={`w-auto px-4 py-2 hover:px-8 duration-150 ease-in-out active:scale-95 text-[12px] lg:text-lg bg-linear-to-r from-cyan-500 to-fuchsia-600 text-white rounded-full cursor-pointer`}>Enter Profile</p>
                    <p className={`w-auto px-4 py-2 text-[14px] lg:text-lg text-black cursor-pointer flex justify-center items-center gap-2`}>Sign Up <TiLocationArrow className={`rotate-45 text-lg`} /></p>
                </div>
            </main>

            <div className={`w-full h-auto py-5 px-5 md:px-16 mt-10 md:mt-10 flex flex-col justify-start items-start`}>
                <h1 className={`w-full text-start font-Montserrat font-bold text-xl md:text-2xl md:text-center`}>Why <span className={`font-Catchye tracking-widest pr-2 bg-linear-to-bl from-blue-500 to-fuchsia-500 bg-clip-text text-transparent italic`}>Study Buddy AI</span> ?</h1>
                <p className={`w-full font-Montserrat text-start md:text-center text-[12px] md:text-sm xl:text-lg lg:px-28 mt-5 text-black`}>Students often struggle to find the right partners for collaborative learning.
                    Our system leverages data-driven insights to match students with peers who share compatible learning styles and interests, enhancing productivity and engagement.</p>
                <div className={`w-full h-auto flex justify-center items-center py-4`}>
                    <img src="src\assets\home-study.jpg" className={`h-64 md:h-80`} />
                </div>
            </div>

            {/* form section*/}
            <div className={`w-full h-auto flex flex-col justify-start items-center pb-10 px-5`}>
                <h1 className={`w-full flex justify-center items-center text-3xl font-Venus-Rising`}>Try It Now</h1>
                <p className={`w-full px-5 md:px-16 text-[12px] md:text-sm xl:text-lg text-center mt-3 font-Montserrat`}>Connect with compatible study partners for better learning experiences</p>
                <p className={`w-full px-5 md:px-16 text-sm lg:text-xl text-center mt-3 font-Montserrat font-bold`}>Start By Telling Us About Yourself</p>

                <div className={`w-full md:w-1/2 h-auto rounded-2xl px-3 bg-gray-200 py-5 mt-5 flex flex-col justify-start items-start gap-3`}>
                    <input onChange={(e) => setName(e.target.value)} type="text" className={`w-full py-2 px-3 bg-white rounded-lg font-Montserrat text-black`} placeholder="Enter your name*" />
                    <p onClick={() => setCourseVisible(!courseVisible)} className={`w-full py-2 px-3 bg-white rounded-lg capitalize flex justify-between items-center cursor-pointer`}>{course ? course : 'select course*'} <IoMdArrowDropdown className={`${courseVisible ? "rotate-180" : "rotate-0"} duration-200 ease-in-out`} /></p>
                    <div className={`w-full ${courseVisible ? "block" : "hidden"} bg-white rounded-lg py-1 px-1 flex flex-col`}>
                        {courses.map((item, index) => {
                            return <span className={`px-2 py-2 text-[12px] rounded-md hover:bg-gray-200 duration-150 ease-in-out cursor-pointer`} key={index} onClick={() => {
                                setCourse(item);
                                setCourseVisible(false);
                            }}>{item}</span>
                        })}
                    </div>

                    <p onClick={() => setClubVisible(!clubVisible)} className={`w-full py-2 px-3 bg-white rounded-lg capitalize flex justify-between items-center cursor-pointer`}>{club ? club : 'select club*'} <IoMdArrowDropdown className={`${clubVisible ? "rotate-180" : "rotate-0"} duration-200 ease-in-out`} /></p>
                    <div className={`w-full ${clubVisible ? "block" : "hidden"} bg-white rounded-lg py-1 px-1 flex flex-col`}>
                        {clubs.map((item, index) => {
                            return <span className={`px-2 py-2 text-[12px] rounded-md hover:bg-gray-200 duration-150 ease-in-out cursor-pointer`} key={index} onClick={() => {
                                setClub(item);
                                setClubVisible(false);
                            }}>{item}</span>
                        })}
                    </div>

                    <input onChange={(e) => setTeam(e.target.value)} type="text" className={`w-full py-2 px-3 bg-white rounded-lg font-Montserrat text-black`} placeholder="Team Preference (1 - 10)*" />
                    <input onChange={(e) => setPersonality(e.target.value)} type="text" className={`w-full py-2 px-3 bg-white rounded-lg font-Montserrat text-black`} placeholder="Personality Type (1 - 10)*" />
                    <input onChange={(e) => setBooksRead(e.target.value)} type="text" className={`w-full py-2 px-3 bg-white rounded-lg font-Montserrat text-black`} placeholder="Books Read This Year (1 - 50)*" />
                    <input onChange={(e) => setHobbyHours(e.target.value)} type="text" className={`w-full py-2 px-3 bg-white rounded-lg font-Montserrat text-black`} placeholder="Weekly Hobby Hours (1 - 20)*" />
                    <p onClick={findBuddy} className={`w-full py-3 text-center font-Montserrat text-white font-semibold bg-linear-to-r from-blue-500 to-fuchsia-600 rounded-lg cursor-pointer mt-2 flex justify-center items-center gap-3 active:scale-95 duration-150 ease-in-out`}>Find My Study Buddies <IoSparklesSharp /></p>
                </div>
            </div>

            <div className={`w-full ${found.length > 0 ? "block" : "hidden"} px-5 h-auto flex flex-col justify-start items-center pt-5 pb-10`}>
                <h1 className={`w-full mb-5 text-center font-Venus-Rising text-sm md:text-lg xl:text-xl text-green-500`}>Found Results : {found.length}</h1>
                <div className={`w-full md:w-1/2 h-auto flex flex-col justify-start items-center gap-4`}>
                    {found.map((item, index) => {
                        return <div key={index} className={`w-full flex justify-between items-center px-5 py-3 cursor-pointer hover:shadow-lg duration-150 ease-in-out rounded-lg bg-gray-200 mb-2`}>
                            <p className={`w-full flex justify-start items-center gap-2 font-Montserrat text-lg md:text-xl`}><MdAccountCircle />Buddy {index+1} <span className={`font-semibold`}>({(item._similarity*100).toFixed(2) + '%'})</span></p>
                            <p onClick={() => {
                                const name = `buddy ${index+1}`;
                                navigate(`/connect?name=${encodeURIComponent(name)}`);
                            }} className={`w-auto px-3 py-2 rounded-lg bg-linear-to-r from-blue-400 to-blue-700 text-white font-Montserrat text-[12px] md:text-sm cursor-pointer flex justify-center items-center gap-2 active:scale-95 duration-150 ease-in-out`}>Connect <VscDebugDisconnect /></p>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Landing
