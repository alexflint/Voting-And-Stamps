import React from 'react';
import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import CreateProcessList from '../../components/process-templates/create-process-list';
import CreatedTemplateSuccess from '../../components/process-templates/created-template-success';
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'
import { getUserId } from '../../services/user.service';

const ProcessTemplateList = (props) => {

    // const {createList} = props;
    const [processListSelectedData, setProcessListSelectedData] = useState({});
    const [processItemName,setProcessItemName]=useState('')
    const [userId,setUserId] = useState('');
    const [processListData, setProcessListData] = useState([
        { process: 'Research of Model v1', processTemplate: 'Start research development',project:'R&D', dueBy: 'Aug 22, 2022', assignees: 'Matt', votes: '24', id: '1', percent: '70%', deletePopup: false },
        { process: 'Submission of Model v2', processTemplate: 'Submitting Designs',project:'R&D', dueBy: 'Aug 28, 2022', assignees: 'Saidutt', votes: '2', id: '2', percent: '33%', deletePopup: false }

    ]);
    const [pro,setPro]=useState([]);

    const [templateList,setTemplateList]=useState([
        {processTemplate:'Start research development',project:'R&D',id:'1',deletePopup:false},
        {processTemplate:'Submiting Designs',project:'R&D',id:'2',deletePopup:false}])

        const GET_PROCESS = gql`
        query process($nameFilter: String!) {
            process(input: {filter:{name:{_neq:$nameFilter}}}) {
              result {_id,name}
            }
        }`;
        const { data, error, loading } = useQuery(GET_PROCESS, {
            notifyOnNetworkStatusChange: true,
            variables: { nameFilter: "''" },
            onCompleted: (dataValue) => {
                console.log(data.process.result);
              //  setTemplateList(data.p);
              //  console.log(templateList);
            }
        });
        const GET_PROCESS_TEMPLATES = gql`
        query processTemplates($nameFilter: String!) {
            processTemplates(input: {filter:{name:{_neq:$nameFilter}}}) {
              results {_id,name,
                parentProject,userId,}
            }
        }`;
        const { data1, error1, loading1 } = useQuery(GET_PROCESS_TEMPLATES, {
            notifyOnNetworkStatusChange: true,
            variables: { nameFilter: getUserId() },
            onCompleted: (dataValue) => {
                console.log(dataValue.processTemplates.results);
                setProcessListData(dataValue.processTemplates.results);
            //    templateList.forEach(e=>{
            //     e.deletePopup=false
            //    })
              //  console.log(templateList);
            }
        });
        const GET_PROJECTS = gql`
        query projs($nameFilter: String!) {
            projs(input: {filter:{userId:{_eq:$nameFilter}}}) {
              results {_id,name,userId}
            }
        }
      `;
        const { data2, error3, loading3 } = useQuery(GET_PROJECTS, {
            notifyOnNetworkStatusChange: true,
            variables: { nameFilter: getUserId()},
            onCompleted: (dataValue) => {
                console.log(dataValue.projs.results);
                setPro(dataValue.projs.results);
                
            }
        });
        // let array=[];
        // console.log(pro);
        // console.log(templateList);
        // pro.forEach((e)=>{
        //     console.log(e);
        //     templateList.forEach(e1=>{
        //         console.log(e);
        //         if(e._id==e1.parentProject){
        //            console.log("***************")
        //             // let obj={...e1,project:`${e.name}`};
        //             // console.log(obj);
        //             // array.push(obj);
        //         }
        //     })
        // });
        // console.log(array);


        const deletePopupHandler=(id)=>{
        
            let arr=[...templateList];
            arr.forEach(element => {
                if(element.id==id){
                    if(element.deletePopup==true){
                        element.deletePopup=false;
                    }else{
                        element.deletePopup=true;
                    }
                 }
                else{
                    element.deletePopup=false;
                  }
                
              });
              setTemplateList(arr);
    
         }
         
         const deleteHandler=(id)=>{
            let arr=[...templateList];
            let index = arr.findIndex(object => {
                    return object.id == id;
                  });
                  console.log(index);
                  arr.splice(index,1);
                  setTemplateList([...arr]);
         }

   const [createDetails, setCreateDetails] = useState(false)
    const [processModal, setProcessModal] = useState(false)
    const [modal, setModal] = useState(false)
    const [onTrackModal, setOnTrackModal] = useState(false)
    const [votedModal, setVotedModal] = useState(false)
    const [votingStepModal, setVotingStepModal] = useState(false)
    
    const CreatePage = () => {
        setProcessList(false);
        setCreateDetails(false);
        setProcessModal(false);
        setModal(false);
        setOnTrackModal(false)
        setVotedModal(false)
        setVotingStepModal(false)

        console.log({
            project: project,
            name: proName,
            duration: estDuration,
            description: desc,
            step: step,
            title: stepTitle,
            textDescription: text

        })
    }
 
    const processCreated = () => {
        setProcessModal(true);
        setOnTrackModal(false)
        setCreateDetails(false);
        setVotedModal(false)
        setVotingStepModal(false)
        setModal(false)
        console.log()
    }
    const createdModal = () => {
        setModal(true)
        setOnTrackModal(false)
        setVotedModal(false)
        setVotingStepModal(false)
        setCreateDetails(false);
        setProcessModal(false);

    }
    const createList = (item) => {

        setProcessItemName(item);
        setCreateDetails(true);
        setProcessModal(false);
        setOnTrackModal(false)
        setVotedModal(false)
        setVotingStepModal(false)
        setModal(false)
    }
    const ontrackModal = (id) => {
        setOnTrackModal(true)
        setVotedModal(false)
        setVotingStepModal(false)
        setCreateDetails(false);
        setProcessModal(false);
        setModal(false)
        setProcessListSelectedData(processListData.find(e => (e.id === id)))

    }
    const showVotedModal = () => {
        setOnTrackModal(false)
        setVotedModal(true)
        setVotingStepModal(false)
        setCreateDetails(false);
        setProcessModal(false);
        setModal(false)
    }
    const showVotingStepModal=()=>{
        setOnTrackModal(false)
        setVotedModal(false)
        setVotingStepModal(true)
        setCreateDetails(false);
        setProcessModal(false);
        setModal(false)
    }

    const closeModal = () => {
        setCreateDetails(false)
    }
    const nextProcess=()=>{
        console.log("hiiiiiiiii")
        setCreateDetails(false);
        setProcessModal(true);
    }
    const closeVotingModal = () => {
        setVotedModal(false)
        setOnTrackModal(true)

    }
    const closeVotingStepModal = () => {
        setVotingStepModal(false)
        setVotedModal(false)
        setOnTrackModal(true)

    }
    let arr=[];
    pro.forEach(e=>{
        processListData.forEach(e1=>{
            if(e1.parentProject==e._id){
                console.log(e1.userId);
                let obj={...e1,project:`${e.name}`};
                arr.push(obj);
            }
        })
    })
    console.log(arr);


    return (
        <>
         <head>
                <meta charSet="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Project Kelvin Widget</title>
                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
                <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"
                    integrity="sha512-6PM0qYu5KExuNcKt5bURAoT6KCThUmHRewN3zUFNaoI6Di7XJPTMoT6K0nsagZKk2OB4L7E3q1uQKHNHd4stIQ=="
                    crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
                    rel="stylesheet" />
                <link rel="stylesheet" href="./assets/css/style.css" />
                <script src="/tailwind.js"></script>
            </head>
        <MainLayout>
        {!createDetails && !processModal ?

<div className="flex w-full flex-col">
<div className="flex justify-between">
    <h1 className="text-3xl mb-8">Process Template List</h1>
    <div className="flex">
        <input type="text" id="search-process-template"
            className="block p-2 px-5  h-8  w-44 text-gray-900 bg-white rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 mr-2"
            placeholder="Search..." />
        <button
            className="text-white  bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5  h-8 text-left mb-2 hover:bg-kelvinBold"
            id="dropdownDefault" data-dropdown-toggle="dropdown">
            <i className="fa-solid fa-sort"></i>
            Filters</button>
    </div>
</div>
{/* <!-- Process section --> */}
<div className="flex flex-col mb-8">
    <div className="flex  items-center">
        <h4 className="text-kelvinDark mb-1 text-md">Process Template
        </h4>
        <h4 className="text-kelvinDark mb-1 text-md" style={{ marginLeft: '190px' }}>Project
        </h4>
    </div>
    <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap">
        {arr.map(item=>{
            return(
                <div
                className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 ">
                <h6 className="mr-2 w-1/2">{item.name}</h6>
                <p className="text-sm opacity-50 mr-2 font-normal w-32" style={{ marginRight: '37%' }}>{item.project}</p>
                <div className="flex items-center">
                    <button onClick={()=>{createList(item)}}
                        className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-44 text-center items-center mr-2"
                        data-modal-toggle="large-modal">
                        <i className="fa-solid fa-play text-white mt-1 mr-1 text-xs"></i>
                        Create Process</button>
                    <button onClick={()=>{console.log(item.id)}}
                        className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-20 text-center "
                        data-modal-toggle="large-modal">
                        Edit</button>
                    <a href="#" className=" px-4 hover:bg-kelvinLight rounded-full" onClick={()=>{deletePopupHandler(item.id)}}>
                        <i className="fa-solid fa-ellipsis-vertical mt-1 text-xl"></i>
                        
                    </a>
                    {item.deletePopup?<button onClick={()=>{deleteHandler(item.id)}}>delete</button>:null}
                </div>
            </div>
            )
        })
        }
        
    </div>
</div>
</div>

            : null
                }


            {createDetails ? <CreateProcessList nextProcess={nextProcess} processItem={processItemName} userId={userId}closeModal={closeModal} processCreated={processCreated} /> : null}
                {processModal ? <CreatedTemplateSuccess createdModal={createdModal} /> : null}
                {/* {modal ? <ProcessListGroup ontrackModal={ontrackModal}   processListData={processListData}
                    setProcessListData={setProcessListData} /> : null}
                {onTrackModal ? <ViewProcess votedModal={showVotedModal} processListSelectedData={processListSelectedData} /> : null}
                {votedModal ? <VotingDetails closeModal={closeVotingModal}  votingStepModal={showVotingStepModal} /> : null}
                {votingStepModal ?<VotingSteps closeModal={closeVotingStepModal}  /> :null} */}
            </MainLayout>
        </>
    )
}
export default ProcessTemplateList;