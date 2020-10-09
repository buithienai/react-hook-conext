import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/store/storeContext";

const About = () => {
    const { state, actions } = useContext(StoreContext);

    useEffect(() => {
        const getUsers = async () => {
            return await fetch("https://jsonplaceholder.typicode.com/users")
                .then(res => res.json())
                .then(result => {
                    actions.userActions.setData({ listUser: result });
                })
                .catch(error => console.log("error happened", error));
        };

        getUsers();
    }, []);

    const renderTable = () => {
        if (state.userStates.listUser.length > 0) {
            return (
                <table>
                    <tbody>
                        {
                            state.userStates.listUser.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            )
        }
    }

    return (
        <div>
            <p>VALUE: {state.generalStates.count}</p>
            {renderTable()}
        </div>
    );
};

export default About;