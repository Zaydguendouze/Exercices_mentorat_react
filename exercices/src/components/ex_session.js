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
    setInputText(incomingTextInput);
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
    // differentes manieres de set un state
    setLImages((prev) => {
      const newLocalImages = [...prev, inputText];
      console.log("newLocalImages", newLocalImages);
      console.log("newLocalImages.indexOf()", newLocalImages.indexOf());
      // console.log("autocompleteList", autocompleteList);

      setAutocompleteList(
        images.filter((img) => !newLocalImages.includes(img))
      );
      return newLocalImages;
    }); // react te donne pas 100% chance de mettre à jour le state avant la prochaine ligne "BATCHING"
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
      <img className="w-40 mx-auto"></img>

      {/* <div>{name}</div> */}
      {lImages.map((img) => img)}

      <input ref={inputToFocus} onChange={handleInputChange} />
      <button onClick={handleClick}>ajouter image</button>

      {isAutocomplete && (
        <ul>
          {autocompleteList.map((element, idx) => (
            <li key={idx}>{element}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
