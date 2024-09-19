import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { TfiWrite } from 'react-icons/tfi';
import { MdClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify'; // Toast 기능을 추가
import 'react-toastify/dist/ReactToastify.css'; // Toast 스타일을 추가
import { useLocation } from 'react-router-dom';

const Createplanner = () => {
  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth.authData);
  const location = useLocation();
  const { projectIdx } = location.state || {};

  // Use projectIdx as needed in your component
  console.log(projectIdx);

  // 쿼리 파라미터에서 project_idx 추출
  const queryParams = new URLSearchParams(location.search);
  const project_Idx = queryParams.get('project_idx');

  const [projectTitle, setProjectTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const ProjectIdData = async () => {
      try {
        // API 호출
        const response = await axios.get(`https://plannerback.guswldaiccproject.com/get_calendar_date/${authData.user_idx}`);
        
        // 데이터가 성공적으로 받아와졌는지 확인
        if (response.data && response.data.length > 0) {
          // 응답 데이터에서 필요한 값 추출
          const { project_idx, start_date, end_date } = response.data[0];
  
          // start_date와 end_date에 대해 1일 빼기
          setStartDate(subtractOneDay(start_date) || '');
          setEndDate(subtractOneDay(end_date) || '');
        }
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };
  
    ProjectIdData();
  }, [project_Idx]); // project_Idx가 변경될 때마다 API 호출
  

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get(
          `https://plannerback.guswldaiccproject.com/get_calendar_date/${authData.user_idx}`
        );
        if (response.data && response.data.length > 0) {
          const { project_idx, start_date, end_date } = response.data[0];
          setStartDate(subtractOneDay(start_date) || '');
          setEndDate(subtractOneDay(end_date) || '');
        }
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };

    fetchCalendarData();
  }, [authData.user_idx]);

  const subtractOneDay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    date.setDate(date.getDate());
    return date.toISOString().split('T')[0];
  };

  const handleSave = async () => {
    if (!projectTitle) {
      toast.error('제목을 입력해주세요!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!project_Idx) {
      console.error('프로젝트가 생성되지 않았습니다');
      return;
    }

    try {
      await axios.patch(
        'https://plannerback.guswldaiccproject.com/update_planner_title',
        {
          project_idx: project_Idx,
          project_title: projectTitle,
          start_date: startDate,
          end_date: endDate,
        }
      );
      navigate(`/planner/${project_Idx}`);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  const handleMain = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm('여행 계획 내용이 삭제됩니다. 삭제하시겠습니까?');
    if (userConfirmed) {
      try {
        await axios.delete(
          `https://plannerback.guswldaiccproject.com/delete_travel_data/${authData.user_idx}/${project_Idx}`
        );
        navigate('/');
      } catch (error) {
        console.error('데이터 삭제 중 오류 발생:', error);
      }
    }
  };

  // const handleMain = async (item) => {
  //   if (handleMain)
  //     try {
  //       await axios.delete(
  //         `https://plannerback.guswldaiccproject.com/delete_travel_data/${authData.user_idx}/${projectIdx}`
  //       );

  //       navigate('/');
  //     } catch (error) {
  //       console.error('데이터 삭제 중 오류 발생:', error);
  //     }
  // };

  return (
    <div className="Page_Wrapper flex flex-col h-screen bg-gray-900">
      <div className="Page_container flex flex-col h-full relative">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="fixed inset-0 bg-white bg-opacity-100 z-999"></div>
          <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
            <div className="w-[45%] h-[60%] bg-white rounded-3xl shadow-lg border border-gray-700">
              <div className="input-wrapper bg-gray-100 shadow-lg rounded-3xl flex flex-col w-full h-full items-center gap-1 ">
                <div className="flex w-[90%]">
                  <div className="top w-full p-2 font-bold text-4xl flex justify-between mt-6 ">
                    <div className="flex items-center rounded-md">
                      <TfiWrite className="mr-2" />
                      <p>My Travel Planner</p>
                    </div>
                    <button onClick={handleMain} type="button">
                      <MdClose className="Logo_image_svg hover:bg-slate-200 rounded-md" />
                    </button>
                  </div>
                </div>

                <div className="middle h-5/6 flex w-full justify-center items-center">
                  <div className="w-full flex gap-7 items-center justify-center">
                    <div className="flex flex-col items-start space-y-11 ">
                      <div className=" w-[100%] rounded-md text-2xl font-bold text-right p-3">
                        제목
                      </div>
                      <div className=" w-[100%] rounded-md text-2xl font-bold text-right p-3">
                        시작 날짜
                      </div>
                      <div className=" w-[100%] rounded-md text-2xl font-bold text-right p-3">
                        마지막 날짜
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-[65%] space-y-10">
                      <input
                        type="text"
                        id="projectTitle"
                        name="projectTitle"
                        placeholder="제목을 입력해주세요."
                        value={projectTitle} // 입력된 제목을 상태에서 가져옴
                        onChange={handleChange} // 제목 입력 시 상태 업데이트
                        className="Logo_text bg-white w-full rounded-md text-gray-600 input-placeholder p-3 border border-slate-300"
                      />
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={handleDateChange}
                        className="Logo_text bg-white w-full rounded-md p-3 border border-slate-300"
                        disabled
                      />
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={handleDateChange}
                        className="Logo_text bg-white w-full rounded-md p-3 border border-slate-300"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <form className="w-full h-1/6 Logo_text flex flex-col justify-between">
                  <div className="sub-btn h-full flex justify-end pt-4 p-6 mr-6">
                    <button
                      onClick={handleSave}
                      type="button"
                      className="flex justify-end Sign_up rounded-md shadow-md bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:opacity-90"
                    >
                      여행 플래너 생성
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer />
      <ToastContainer />
    </div>
  );
};
export default Createplanner;
