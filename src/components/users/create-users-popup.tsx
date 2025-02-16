import React, { useState } from 'react';
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'


const CreateUserPopup = (props) => {
    const {users,setUsers,addUser,setAddUser,setAddUserPopup}=props;
   
    const CREATE_PUSERS = gql`
    mutation createProj($name: String!, $role: String!, $levelUp: String!, $department: String!) {
      createPusers(input: {data: {name: $name, role: $role, levelUp: $levelUp, department: $department}}) {
        data {_id, name,role }
      }
    }`;
    let [createPUsersData, {loading, data, error}] = useMutation(
        CREATE_PUSERS,{
          onCompleted: (data) => {
            props.addValue({
                name:addUser.name,
                role:addUser.role,
                levelUp:addUser.levelUp,
                department:addUser.department
              })
            props.closeModal();
          },
          onError: (error) => console.error("Error creating a post", error),
        }
      );


    const createHandler=()=>{
        let arr=[...users]
        arr.push(addUser);
        console.log(arr);
        setUsers([...arr]);
        createPUsersData({variables:{'name':addUser.name,'role':addUser.role,'levelUp': addUser.levelUp,'department':addUser.department}});
        setAddUserPopup(false);
            }
  const userHandler=(obj)=>{
    setAddUser({...addUser,...obj});
  }
    return (
        <>
            <div id="user-modal" tabIndex={-1}
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full" style={{display:'flex',justifyContent:'center'}}>
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow ">
                            {/* <!-- Modal header --> */}
                            <div className="flex justify-between items-center p-5 rounded-t">
                                <h3 className="text-xl font-medium text-gray-900 ">
                                    {/* <!-- Let's build an Organization --> */}
                                </h3>
                              
                            </div>
                            <form action="">
                                {/* <!-- Modal body --> */}
                                <div className="px-6 space-y-6 flex">
                                    <div className="flex flex-col ">

                                        <div className="flex flex-col mb-8">
                                            <h2 className="text-3xl mb-2">Create User</h2>
                                        </div>
                                        <div className="flex flex-col mb-8">
                                            <h4 className="text-xs font-bold mb-2">Name</h4>
                                            <input type="text" id="fullname" onChange={(e)=>{userHandler({name:`${e.target.value}`})}}
                                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                style={{width:'21rem'}}
                                                placeholder="Enter full name" required />
                                        </div>
                                        <div className="flex flex-col mb-8">
                                            <label htmlFor="countries" className="text-xs font-bold mb-2" >Role </label>
                                            <select id="countries" defaultValue={'DEFAULT'} onChange={(e)=>{userHandler({role:`${e.target.value}`})}}
                                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                <option value="DEFAULT">Select Role(s) of user</option>
                                                <option value="US">HR</option>
                                                <option value="CA">HR</option>
                                                <option value="FR">HR</option>
                                                <option value="DE">HR</option>
                                            </select>


                            
                                            <p className="text-xs opacity-50 mt-2">you can select multiple roles for the users
                                            </p>
                                        </div>
                                        <div className="flex flex-col mb-8">
                                            <label htmlFor="countries" className="text-xs font-bold mb-2" >1 Level Up </label>
                                            <select id="countries" defaultValue={'DEFAULT'}  onChange={(e)=>{userHandler({levelUp:`${e.target.value}`})}}
                                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                <option value="DEFAULT">Select the manager for the user</option>
                                                <option value="US">HR</option>
                                                <option value="CA">HR</option>
                                                <option value="FR">HR</option>
                                                <option value="DE">HR</option>
                                            </select>


                            
                                            <p className="text-xs opacity-50 mt-2">select the users 1 level above the user
                                            </p>
                                        </div>
                                        <div className="flex flex-col mb-8">
                                            <label htmlFor="countries" className="text-xs font-bold mb-2" >Department </label>
                                            <select id="countries" defaultValue={'DEFAULT'}  onChange={(e)=>{userHandler({department:`${e.target.value}`})}}
                                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                <option value="DEFAULT">Select the department user belongs to</option>
                                                <option value="US">HR</option>
                                                <option value="CA">HR</option>
                                                <option value="FR">HR</option>
                                                <option value="DE">HR</option>
                                            </select>


                            
                                            <p className="text-xs opacity-50 mt-2">you can select multiple departments
                                            </p>
                                        </div>
                                        {/* <div className="flex flex-col mb-8">
                                            <label htmlFor="countries_multiple" className="text-xs font-bold mb-2">
                                                Department</label>
                                            <select multiple id="countries_multiple" defaultValue={'DEFAULT'}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                                <option value="DEFAULT">Choose a Department</option>
                                                <option value="US">Manager 1</option>
                                                <option value="CA">Manager 2</option>
                                                <option value="FR">Manager 3</option>
                                                <option value="DE">Manager 4</option>
                                            </select>
                                            <p className="text-xs opacity-50 mt-2">You can select multiple departments
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="flex items-center p-6 space-x-2 rounded-b justify-end  dark:border-gray-600">
                                    <button type="submit"
                                        className="text-kelvinBlack  hover:bg-kelvinLight focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                                        data-modal-toggle="success-modal"  onClick={()=>{setAddUserPopup(false)}}>Cancel</button>
                                     <button type="submit"
                                        className="text-white bg-gradient-to-r from-kelvinDark to-kelvinBold hover:bg-gradient-to-br focus:ring-4  focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                                        data-modal-toggle="success-modal" onClick={createHandler}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateUserPopup;