import React, { useState, useEffect } from "react";
import axiosInstance from "../common/AxiosApi";


const HabitHistory = () => {
    const [data, setData] = useState({ results: [] });

    useEffect(() => {
        const fetchHabit = async () => {
            axiosInstance.defaults.headers['Authorization'] = "Bearer " + localStorage.getItem('access_token')
            const result = await axiosInstance.get('/habit/')
            setData(result.data)
        }
        fetchHabit()
    }, []
    )

    // TODO: make it beatifull
    return (
        <div>
            <h1>Habit Lists</h1>
            <ul>
                {
                    data.results.map(
                        item => (
                            <li key={item.id}>
                                <a>
                                    {item.name}
                                </a>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}

export default HabitHistory
