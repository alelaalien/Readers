import React , {useEffect, useState} from "react";

export default function InfiniteScroll({list, Item, handleClickFromChild}){
  
    const [page, setPage] = useState(list.current_page);
    const item = Item;
//********************************** */ carga dinamica de datos ****** 
useEffect(() => {
    const handleScroll = () => {
        if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
        ) {
        fetchData();
        }
    };

    const fetchData = async () => {
        try {
        const response = await axios.get(`/api/fetch-data?page=${page + 1}`);
        setData((prevData) => [...prevData, ...response.data.data]);
        setPage(response.data.current_page);
        } catch (error) { 
        console.error('Error fetching data:', error);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, [page]);

//******************************************************************************** */
    return (
        <div className="row p-4 bg-white">
        {
            list.data.map(element=> 
                ( 
                <Item key={`${Math.random()}-${element.id}`} element={element}  onClickFromParent={handleClickFromChild}/>)
                ) 
        } 
        </div> 
    );
}