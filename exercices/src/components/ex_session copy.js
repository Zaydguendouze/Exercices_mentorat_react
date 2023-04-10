import "../exercice.css";
import { useState, useEffect, useRef } from "react";
import Picture from "./Picture";

// const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

export default function App() {
  const [images, setImages] = useState([
    "img1.jpg ",
    "img2.jpg ",
    "img3.jpg ",
    "img4.jpg ",
  ]);
  const [isAutocomplete, setIsAutocomplete] = useState(false);
  const [inputText, setInputText] = useState("");

  const [lImages, setLImages] = useState(["img1.jpg "]);
  const [autocompleteList, setAutocompleteList] = useState(
    images.filter((img) => !lImages.includes(img))
  );

  function ImagesComponent() {
    return images.map((name, index) => (
      <Picture
        imageName={name}
        index={index}
        key={index}
        //   handleRemove={handleRemoveImage}
      />
    ));
  }

  const handleInputChange = (e) => {
    const incomingTextInput = e.target.value;
    setInputText(incomingTextInput.trim());
    setAutocompleteList((prev) => {
      let isMatch = false;
      let newAutocompleteList = [...prev];
      autocompleteList.forEach((element) => {
        if (element && element.trim() === incomingTextInput) {
          console.log("element", element);
          isMatch = true;
          newAutocompleteList = newAutocompleteList.filter(
            (e) => e !== element
          );
        }
      });
      if (isMatch) {
        return newAutocompleteList;
      }

      return images.filter((img) => !lImages.includes(img));
    });
  };

  const handleClick = (e) => {
    // if (inputText.trim() !== "" && images.includes(inputText.trim())) {
    // differentes manieres de set un state
    // Vérifier si l'input n'est pas vide
    setLImages((prev) => {
      const newLocalImages = [lImages, inputText];
      console.log("newLocalImages", newLocalImages);
      if (inputText.trim() === "") {
        alert("Veuillez ajouter une image existante");
        return prev;
      }
      images.forEach((image) => {
        if (image.toLowerCase() !== inputText.toLowerCase()) {
          console.log("image", image);
          console.log("inputText", inputText);
          alert("Veuillez ajouter une image existante");
          return;
        }
      });
      // for (let i = 0; i < images.length; i++) {
      //   const image = images[i];
      //   if (image.toLowerCase() !== inputText.toLowerCase()) {
      //     console.log("images[i]", image);
      //     console.log("inputText", inputText);
      //     alert("Veuillez ajouter une image existante");
      //     return prev;
      //   }
      // }
      setImages([...images, inputText.trim()]);
      console.log("inputText", inputText);
      setAutocompleteList(
        images.filter((img) => !newLocalImages.includes(img))
      );
      return newLocalImages;
    });
    // } // react te donne pas 100% chance de mettre à jour le state avant la prochaine ligne "BATCHING"
  };

  // const handleClick = (e) => {
  //   // differentes manieres de set un state
  //   setLImages((prev) => {
  //     const newLocalImages = [...prev, inputText];
  //     console.log("newLocalImages", newLocalImages);
  //     console.log("images", images);
  //     // console.log("autocompleteList", autocompleteList);
  //     for (let i = 0; i < newLocalImages.length; i++) {
  //       for (let j = 0; j < images.length; j++) {
  //         if (
  //           newLocalImages[i].trim().toLowerCase() ===
  //           images[j].trim().toLowerCase()
  //         ) {
  //           console.log("OK");
  //         } else {
  //           alert("Veuillez ajouter une image existante");
  //           console.log("NOTOK");
  //           break;
  //         }
  //         console.log("newLocalImages[i]", newLocalImages[i].toLowerCase());
  //         console.log("images[j]", images[j].toLowerCase());
  //       }
  //     }
  //     setAutocompleteList(
  //       images.filter((img) => !newLocalImages.includes(img))
  //     );
  //     return newLocalImages;
  //   }); // react te donne pas 100% chance de mettre à jour le state avant la prochaine ligne "BATCHING"
  // };

  useEffect(() => {
    if (inputText.length > 0) {
      setIsAutocomplete(true);
    } else setIsAutocomplete(false);
  }, [inputText]);

  const inputToFocus = useRef(null);

  useEffect(() => {
    inputToFocus.current.focus();
    // console.log(inputToFocus);
  });

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <ImagesComponent />
      </div>

      {/* <div>{name}</div> */}
      {/* {lImages.map((img) => img)} */}

      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ref={inputToFocus}
        onChange={handleInputChange}
      />

      <div className="flex items-center justify-between">
        <div className="">
          {isAutocomplete && (
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              {autocompleteList.map((element, idx) => (
                <li className="flex items-center" key={idx}>
                  {element}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="bg-blue-500 m-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          ajouter image
        </button>
      </div>
    </div>
  );
}
