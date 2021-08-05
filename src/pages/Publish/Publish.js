import "./Publish.scss";
import axios from "axios";
import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";

function Publish(props) {
  const { token } = props;
  const history = useHistory();

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [etat, setEtat] = useState("");
  const [lieu, setLieu] = useState("");
  const [price, setPrice] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  /* Drop Zone */
  const [dropzone, setDropzone] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (dropzone.length < 5) {
        const newDropzone = [...dropzone, acceptedFiles];
        const pictureAdded = acceptedFiles.map((elem) =>
          URL.createObjectURL(elem)
        );
        const newFiles = [...files, pictureAdded];
        setFiles(newFiles);
        setDropzone(newDropzone);
      }
    },
    [dropzone, files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeMarque = (event) => {
    setMarque(event.target.value);
  };

  const handleChangeTaille = (event) => {
    setTaille(event.target.value);
  };

  const handleChangeCouleur = (event) => {
    setCouleur(event.target.value);
  };

  const handleChangeEtat = (event) => {
    setEtat(event.target.value);
  };

  const handleChangeLieu = (event) => {
    setLieu(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChecked = () => {
    const check = !checkBox;
    setCheckBox(check);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    dropzone.forEach((file, index) => {
      formData.append(`picture${index + 1}`, file[0]);
    });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", etat);
    formData.append("brand", marque);
    formData.append("city", lieu);
    formData.append("size", taille);
    formData.append("color", couleur);
    formData.append("exchange", checkBox);
    try {
      const response = await axios.post(
        "https://vinted-api-chris.herokuapp.com/offer/publish",
        //"http://localhost:5000/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newArticle = response.data._id;
      history.push(`/offer/${newArticle}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bodyPublish">
      <div className="contain">
        <h1>Vends ton article</h1>
        <form onSubmit={handleSubmit} className="formPublish">
          <div className="block-0">
            <div className="dropzone" {...getRootProps()}>
              <div className="dropzoneInput">
                <input {...getInputProps()} />

                {files
                  ? files.map((elem, index) => {
                      return (
                        <img
                          className="pictureAdded"
                          key={index}
                          src={elem}
                          alt="prévision"
                        />
                      );
                    })
                  : null}
                {isDragActive ? (
                  <p>Déplace l'image ici ...</p>
                ) : (
                  <div>
                    Déplace une image ici ou clique pour ouvrir l'explorateur
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="block-1">
            <div className="fieldsArticle">
              <h2>Titre</h2>
              <label htmlFor="title">
                <input
                  value={title}
                  onChange={handleChangeTitle}
                  placeholder="ex: Chemise Sézane verte"
                  type="text"
                />
              </label>
            </div>
            <div className="fieldsArticle">
              <h2>Décris ton article</h2>
              <label htmlFor="description">
                <textarea
                  value={description}
                  onChange={handleChangeDescription}
                  placeholder="ex: porté quelque fois,taille correctement"
                  type="text"
                />
              </label>
            </div>
          </div>
          <div className="block-2">
            <div className="fieldsArticle">
              <h2>Marque</h2>
              <label htmlFor="marque">
                <input
                  value={marque}
                  onChange={handleChangeMarque}
                  placeholder="ex:Zara"
                  type="text"
                />
              </label>
            </div>

            <div className="fieldsArticle">
              <h2>Taille</h2>
              <label htmlFor="taille">
                <input
                  value={taille}
                  onChange={handleChangeTaille}
                  placeholder="ex: 42-XXL"
                  type="text"
                />
              </label>
            </div>

            <div className="fieldsArticle">
              <h2>Couleur</h2>
              <label htmlFor="couleur">
                <input
                  value={couleur}
                  onChange={handleChangeCouleur}
                  placeholder="ex:Fushia"
                  type="text"
                />
              </label>
            </div>

            <div className="fieldsArticle">
              <h2>Etat</h2>
              <label htmlFor="etat">
                <input
                  value={etat}
                  onChange={handleChangeEtat}
                  placeholder="ex: Neuf avec étiquette"
                  type="text"
                />
              </label>
            </div>

            <div className="fieldsArticle">
              <h2>Lieu</h2>
              <label htmlFor="lieu">
                <input
                  value={lieu}
                  onChange={handleChangeLieu}
                  placeholder="ex: Paris"
                  type="text"
                />
              </label>
            </div>
          </div>
          <div className="block-3">
            <div className="fieldsArticle">
              <h2>Prix</h2>
              <label htmlFor="price">
                <input
                  value={price}
                  onChange={handleChangePrice}
                  placeholder="ex:0.10€"
                  type="text"
                />
              </label>
            </div>
            <div className="checkboxPublish">
              <label htmlFor="checkbox">
                <input
                  checked={checkBox}
                  onChange={handleChecked}
                  type="checkbox"
                />{" "}
                Je suis intéressé(e) par les échanges
              </label>
            </div>
          </div>
          <div className="submitButton">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Publish;
