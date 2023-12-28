import React from 'react';
import Guest from '@/Layouts/GuestLayout';
import OnePoem from '@/Components/OnePoem';

export default function PoemIndex({poems, auth})
{
    console.log(poems);
    return(
        <Guest  auth={auth}> 

            <div className="flex flex-row">
                {/* Primera columna */}
                <div className="w-1/5 bg-gray-200">
                    {/* Lista de categorías */}
                    <ul className="py-4">
                    <li className="px-2 py-1">Categoría 1</li>
                    <li className="px-2 py-1">Categoría 2</li>
                    <li className="px-2 py-1">Categoría 3</li>
                    {/* Agrega más elementos de la lista si es necesario */}
                    </ul>
                </div>

                {/* Segunda columna */}
                <div className="w-4/5" style={{background: 'white'}}>
                    {
                        poems.map(element=> 
                           ( 
                           <OnePoem key={element.id} poem={element}/>)
                           ) 
                    } 
                </div>

                {/* Tercera columna */}
                <div className="w-1/5" style={{background: 'white'}}>
                    {/* Contenido de la tercera columna */}
                </div>
            </div>
 
        </Guest>
    );

}