'use client';
import { createPortal } from 'react-dom';
import { useState, useEffect, useCallback } from 'react';
import { Item, Location, Option } from '@prisma/client';

interface InputHelperProps {
    onSendMessage: (message: string) => void;
    isFocused: boolean;
}


interface HelperOptions {
    items: Item[];
    locations: Location[];
    options: Option[];
}

export default function InputHelper({ onSendMessage, isFocused }: InputHelperProps) {
    // State pour les données (Items, Locations, Options)
    const [helper, setHelper] = useState<HelperOptions>();

    // State la sélection de l'Option (Question)
    const [selectedOption, setSelectedOption] = useState<Option | null>();

    // States pour la sélection de l'Item et du filtre par catégorie
    const [selectedCat, setSelectedCat] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    // States pour la sélection de la Location et du filtre par type
    const [selectedType, setSelectedType] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    // States qui défini si il faut un Item ou une Location dans le formulaire
    const [hasItem, setHasItem] = useState(false);
    const [hasLocation, setHasLocation] = useState(false);





    /**
     * Retour de tous les useStates à leur valeur par défaut
     */
    const clearAll = () => {
        setSelectedOption(null)
        setSelectedCat('')
        setSelectedItem('')
        setSelectedType('')
        setSelectedLocation('')
        setHasItem(false)
        setHasLocation(false)
    }


    /**
     * Fetch la liste des Options, Items et Locations
     * utilisées par notre Helper
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/helper");
                const data = await response.json();
                setHelper(data)
            } catch (error) {
                console.error("Failed to fetch field options:", error);
            }
        };
        fetchData();
    }, []);





    /**
     * Handlers pour les quatres select existant pour le notre Helper.
     */
    const handleChangeCat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCat(e.target.value);
    };
    const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };
    const handleChangeItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(e.target.value);
    };
    const handleChangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(e.target.value);
    };





    /**
     * Handler pour la sélection de l'option (question)
     * Cette fonction définie aussi la présence de select Item et/ou Location 
     * dans la prochaine étape
     */
    const optionSelection = (e: React.MouseEvent, opt: Option) => {
        e.preventDefault();
        const hasItem = (opt.description.match(new RegExp("\\sx\\s?", "g"))) ? true : false;
        setHasItem(hasItem);
        const hasLocation = (opt.description.match(new RegExp("\\sy\\s?", "g"))) ? true : false;
        setHasLocation(hasLocation);
        setSelectedOption(opt);
    };



    /**
     * Fonction qui build notre question
     */
    const submitForm = () => {
        if (hasItem && selectedItem == "") {
            alert('Veuillez sélectionner un Item pour votre requête')
        }
        else if (hasLocation && selectedLocation == "") {
            alert('Veuillez sélectionner un Lieu pour votre requête')

        } else {
            let message = selectedOption!.description;
            const item = helper?.items.find((e) => e.id == selectedItem)
            if (item) {
                message = message.replace("x", item.name)
            }
            const loc = helper?.locations.find((e) => e.id == selectedLocation)
            if (loc) {
                message = message.replace("y", loc.name)
            }
            onSendMessage(message)
            clearAll();
        }
    }



    const preventEvent = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    if (selectedOption) {
        return (
            <div onClick={clearAll}
                className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50"
            >
                <div
                    onClick={preventEvent}
                    className="bg-white p-8 rounded-lg w-1/3"
                >
                    <div className="flex justify-end">
                        <button onClick={clearAll} className="text-xl text-red-700  cursor-pointer">X</button>
                    </div>
                    <h2 className="text-xl mt-4 text-center mb-4 text-gray-900">{selectedOption.description}</h2>
                    <div className="space-y-4">

                        {(hasLocation) ?
                            <div className="flex space-x-4 w-full max-w-2xl mx-auto mt-10">
                                <div className="w-48">
                                    <label
                                        htmlFor="secondSelect"
                                        className="block text-sm font-semibold text-gray-500 mb-2"
                                    >
                                        Filtrer par Type
                                    </label>
                                    <select

                                        value={selectedType}
                                        onChange={handleChangeType}
                                        id="secondSelect"
                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-gray-900"
                                    >
                                        <option value="">Tout afficher</option>
                                        {Array.from(new Set(helper?.locations.map(location => location.type))).map((location) => (
                                            <option key={location} value={location}>
                                                {location}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label
                                        htmlFor="firstSelect"
                                        className="block text-sm font-semibold text-gray-500 mb-2"
                                    >
                                        Sélectionnez un Lieu
                                    </label>
                                    <select

                                        value={selectedLocation}
                                        onChange={handleChangeLocation}
                                        id="firstSelect"
                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-gray-900"
                                    >

                                        <option value="">Votre lieu</option>
                                        {
                                            (selectedType) ?
                                                helper?.locations
                                                    .filter((locations) => locations.type == selectedType)
                                                    .map((location) => (
                                                        <option key={location.id} value={location.id}>
                                                            {location.name}
                                                        </option>
                                                    )) :
                                                helper?.locations
                                                    .map((location) => (
                                                        <option key={location.id} value={location.id}>
                                                            {location.name}
                                                        </option>
                                                    ))

                                        }
                                    </select>
                                </div>

                            </div>
                            : null}
                        {(hasItem) ?
                            <div className="flex space-x-4 w-full max-w-2xl mx-auto mt-10">
                                <div className="w-48">
                                    <label
                                        htmlFor="secondSelect"
                                        className="block text-sm font-semibold text-gray-500 mb-2"
                                    >
                                        Filtrer par Catégorie
                                    </label>
                                    <select

                                        value={selectedCat}
                                        onChange={handleChangeCat}
                                        id="secondSelect"
                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-gray-900"
                                    >
                                        <option value="">Tout afficher</option>
                                        {Array.from(new Set(helper?.items.map(item => item.category))).map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label
                                        htmlFor="firstSelect"
                                        className="block text-sm font-semibold text-gray-500 mb-2"
                                    >
                                        Sélectionnez un Item
                                    </label>
                                    <select

                                        value={selectedItem}
                                        onChange={handleChangeItem}
                                        id="firstSelect"
                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-gray-900"
                                    >

                                        <option value="">Votre Item</option>
                                        {
                                            (selectedCat) ?
                                                helper?.items
                                                    .filter((items) => items.category == selectedCat)
                                                    .map((items) => (
                                                        <option key={items.id} value={items.id}>
                                                            {items.name}
                                                        </option>
                                                    )) :
                                                helper?.items
                                                    .map((items) => (
                                                        <option key={items.id} value={items.id}>
                                                            {items.name}
                                                        </option>
                                                    ))

                                        }
                                    </select>
                                </div>
                            </div> : null}
                        <div className="flex justify-end mt-4">
                            <button onClick={submitForm} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 cursor-pointer transition-all duration-300">Confirmer</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!isFocused) return null;
    return (
        <div>
            <div onMouseDown={handleMouseDown} className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 shadow-sm transition-all duration-200">
                {helper?.options?.map((opt) => (
                    <h3 key={opt.id} onClick={(e) => optionSelection(e, opt)} className=" cursor-pointer text-m font-bold mb-2 text-gray-500 hover:text-gray-900">{opt.description}</h3>
                ))}
            </div>


        </div>
    );
} 