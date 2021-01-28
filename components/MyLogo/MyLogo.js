class MyLogo extends HTMLElement {

    html = `
        <link href="https://fonts.googleapis.com/css?family=Rancho&effect=fire-animation|anaglyph|emboss|mitosis|neon|outline|shadow-multiple|3d|3d-float" rel="stylesheet">

        <!-- OPTIONS DU MENU -->
        <input type="button" id="showMenu" value="Affichage menu">
        <input type="button" id="printLogo" value="Imprimer le logo">
        Opacité du menu<input type="range" min="0.2" max="1" value="1" step="0.01" id="opacityMenuSelector">

        <div id="menu">
            <br>

            <!-- OPTIONS TRAITEMENT DU TEXTE -->
            <input type="text" id="textEditor" value="Modifier le texte">
                <select id="policeSelector">
                    <option value="" id="policeChoosen"></option>
                    <option value="Impact,Charcoal,sans-serif">Impact,Charcoal,sans-serif</option>
                    <option value="Lucida Handwriting">Lucida Handwriting</option>
                    <option value="Papyrus">Papyrus</option>
                </select>
                <input type="color" id="colorSelector"> 
                Taille<input type="range" min="20" max="250" value="50" id="sizeSelector">
                Rotation<input type="range" min="0" max="360" value="0" id="rotateSelector">
                Opacité<input type="range" min="0.2" max="1" value="1" step="0.01" id="opacitySelector">
            <br><br>
            <select id="animationSelector">
                    <option value="">Changer l'animation</option>
                    <option value="fire-animation">Fire</option>
                    <option value="anaglyph">Anaglyph</option>
                    <option value="emboss">emboss</option>
                    <option value="3d">3D</option>
                    <option value="3d-float">3D float</option>
                    <option value="shadow-multiple">shadow-multiple</option>
                    <option value="outline">outline</option>
                    <option value="neon">neon</option>
                </select>
                <input type="button" id="playAnimation" value="RUN">
            <br><br>
            
            <!-- IMAGE DE FOND -->
            <select id="imageSelector">
                <option value="" id="importedImage">Selectionner une image de fond</option>
                <option value="url('components/img/IA.png')">IA</option>
                <option value="url('components/img/Cassoulet.jpg')">Cool</option>
                <option value="url('components/img/CoteObscur.png')">Le côté obscur</option>
                <option value="url('components/img/RetroWave.webp')">Retro Wave</option>
            </select>
            <input type="file" id="importImage" accept=".jpg, .jpeg, .png, .gif" value="./components/import/">bouton import image : non fonctionnel
            <div id="imageSizeOption" display=""><br><br><br>
                Taille<input type="range" min="1" max="300" value="50" id="imageSizeSelector">
            </div><br><br>
            <br>

            <!-- AUDIO -->
            <audio id="audio-test"><source src="components/audio/Micheal Jackson - Billie jean.mp3" type="audio/mp3"></audio>
            <audio id="audio-secondPoteauPavard"><source src="components/audio/secondPoteauPavard.mp3" type="audio/mp3"></audio>
            <audio id="audio-acdc"><source src="components/audio/acdc.mp3" type="audio/mp3"></audio>

            <!-- Erreur rencontrée lors de l'import de musique : non fonctionnel -> erreur liée au 'currentSource' -->
            <audio id="audio-imported"><source id="selectedSound" src="" type="audio/mp3"></audio>
            
            <select id="soundSelector">
                <option id="soundToImport" value="audio-imported">Selectionner une musique ou un son</option>
                <option value="audio-test">M. Jackson - Billie Jean</option>
                <option value="audio-secondPoteauPavard">Second poteau PAVARD...</option>
                <option value="audio-acdc">Thunderstruck</option>
            </select>
            <input type="file" id="importSound" accept=".wav, .mp3" value="./components/imported/">bouton import son : non fonctionnel<br>
            <div id="soundOptions" display="">
                <input type="button" id="playSound" value="PLAY"> 
                <input type="button" id="stopSound" value="STOP">
                Volume<input type="range" min="0.01" max="1" value="0.8" step="0.01" id="volumeSoundSelector">
            </div>

        </div>
        <br><br><br>

        <!-- MON LOGO -->
        <div id="logoDiv" style="background-position: center; background-size = auto 50%">
            <h1 id="logo" class="" style="text-align: center;">Insérer un texte</h1>
        </div>
    `

    constructor() {
        super();
        const shadow = this.attachShadow({ 
            mode: "open" 
        });
        this.color = this.getAttribute("color");
        this.text = this.getAttribute("text");
        this.size = this.getAttribute("size");
        this.animation = this.getAttribute("animation");
        this.police = this.getAttribute("police");
        this.image = this.getAttribute("image");
        this.imageSize = this.getAttribute("imageSize");
        this.rotate = this.getAttribute("rotate");
        this.soundName = this.getAttribute("soundName");
    }

    connectedCallback() {

        /*************************** PROPRIETES ***************************/
        this.showMenu = true;
        this.shadowRoot.innerHTML = this.html;

        /*** QuerySelectors ***/
        // Menu
        this.menu = this.shadowRoot.querySelector("#menu");
        this.showMenuButton = this.shadowRoot.querySelector("#showMenu");
        this.printLogo = this.shadowRoot.querySelector("#printLogo");
        this.opacityMenuSelector = this.shadowRoot.querySelector("#opacityMenuSelector");
        // Text
        this.textEditor = this.shadowRoot.querySelector("#textEditor");
        this.colorSelector = this.shadowRoot.querySelector("#colorSelector");
        this.policeSelector = this.shadowRoot.querySelector("#policeSelector");
        this.policeChoosen = this.shadowRoot.querySelector("#policeChoosen");
        this.sizeTextSelector = this.shadowRoot.querySelector("#sizeSelector");
        this.rotateSelector = this.shadowRoot.querySelector("#rotateSelector");
        this.opacityTextSelector = this.shadowRoot.querySelector("#opacitySelector");
        this.animationSelector = this.shadowRoot.querySelector("#animationSelector");
        this.playAnimation = this.shadowRoot.querySelector("#playAnimation");
        // Images
        this.imageSelector = this.shadowRoot.querySelector("#imageSelector");
        this.importImage = this.shadowRoot.querySelector("#importImage");
        this.importedImage = this.shadowRoot.querySelector("#importedImage");
        this.imageSizeSelector = this.shadowRoot.querySelector("#imageSizeSelector");
        this.imageSizeOption = this.shadowRoot.querySelector("#imageSizeOption");
        // Sons
        this.soundSelector = this.shadowRoot.querySelector("#soundSelector");
        this.importSound = this.shadowRoot.querySelector("#importSound");
        this.selectedSound = this.shadowRoot.querySelector("#selectedSound");
        this.soundToImport = this.shadowRoot.querySelector("#soundToImport");
        this.soundOptions = this.shadowRoot.querySelector("#soundOptions");
        this.playSound = this.shadowRoot.querySelector("#playSound");
        this.stopSound = this.shadowRoot.querySelector("#stopSound");
        this.volumeSoundSelector = this.shadowRoot.querySelector("#volumeSoundSelector");
        // Logo
        this.logoDiv = this.shadowRoot.querySelector("#logoDiv");
        this.myLogo = this.shadowRoot.querySelector("#logo");


        if(this.color) {
            this.myLogo.style.color = this.color;
            this.colorSelector.value = this.color;
        }
        if(this.text) this.myLogo.textContent = this.text;
        if(this.size) this.myLogo.style.fontSize = this.size + "px";
        if(this.police) {
            this.logoDiv.style.fontFamily = this.police;
            this.policeChoosen.value = this.police;
            this.policeChoosen.innerHTML = this.police;
        }
        if(this.image) this.logoDiv.style.backgroundImage = "url('components/img/" + this.image + ".jpg')";
        else this.imageSizeOption.style.display = "none";
        if(this.rotate) this.myLogo.style.transform = 'rotate(' + this.rotate + 'deg)';
        if(this.imageSize) this.logoDiv.style.backgroundSize = "auto " + this.imageSize + "%";
        if(this.animation != "") {
            this.myLogo.classList.add(this.animation);
            this.animated = true;
        } else {
            // this.imageSizeOption.style.display = "none";
            this.playAnimation.setAttribute("disabled", "");
            this.animated = false;
        }
        // if(this.soundName) {
        //    this.sound = this.shadowRoot.querySelector("#" + this.soundName);
        // }
        this.soundOptions.style.display = "none";
        this.soundPlay = false;

        /*************************** OPTIONS DU MENU ***************************/
        // Show menu
        this.showMenuButton.addEventListener(
            "click", (event) => {
                if(this.showMenu) {
                    this.menu.style.visibility = "hidden";
                    this.showMenu = false;
                } else {
                    this.menu.style.visibility = "visible";
                    this.showMenu = true;
                }
            }
        )
        // Print logo
        this.printLogo.addEventListener(
            "click", (event) => {
                console.log("toto")
                print()
            }
        )
        // Opacity Menu
        this.opacityMenuSelector.addEventListener(
            "input", (event) => {
                this.menu.style.opacity = event.target.value;
            }
        )

        /*************************** OPTIONS TRAITEMENT DU TEXTE ***************************/
        // Text editor
        this.textEditor.addEventListener(
            "input", (event) => {
                this.myLogo.textContent = event.target.value;
            }
        )
        // Police Selector
        this.policeSelector.addEventListener(
            "input", (event) => {
                this.logoDiv.style.fontFamily = event.target.value;
            }
        )
        // Size selector
        this.sizeTextSelector.addEventListener(
            "input", (event) => {
                this.myLogo.style.fontSize = event.target.value + "px";
            }
        )
        // Rotate Text
        this.rotateSelector.addEventListener(
            "input", (event) => {
                this.myLogo.style.transform = 'rotate(' + event.target.value + 'deg)';
            }
        )
        // Color selector
        this.colorSelector.addEventListener(
            "input", (event) => {
                this.myLogo.style.color = event.target.value;
            }
        )
        // Opacity Text Selector
        this.opacityTextSelector.addEventListener(
            "input", (event) => {
                this.myLogo.style.opacity = event.target.value;
            }
        )
        // Animation selector
        this.animationSelector.addEventListener(
            "input", (event) => {
                this.animation = event.target.value;
                if(this.animation != "") this.playAnimation.removeAttribute("disabled");
                else this.playAnimation.setAttribute("disabled", "");
            }
        )
        // Animation runner
        this.playAnimation.addEventListener(
            "click", (event) => {
                if (this.animated == false) {
                    this.myLogo.classList.add("font-effect-" + this.animation);
                    this.animated = true;
                    this.playAnimation.value = "STOP";
                } else {
                    this.myLogo.classList.remove("font-effect-" + this.animation);
                    this.animated = false;
                    this.playAnimation.value = "RUN";
                }
            }
        )

        /*************************** IMAGE DE FOND ***************************/
        // Image Selector
        this.imageSelector.addEventListener(
            "input", (event) => {
                this.animation = event.target.value;
                this.logoDiv.style.backgroundImage = this.animation;
                if(this.animation == "") this.imageSizeOption.style.display = "none";
                else this.imageSizeOption.style.display = "inline-flex";
            }
        )
        // Image Size Selector
        this.imageSizeSelector.addEventListener(
            "input", (event) => {
                this.logoDiv.style.backgroundSize = "auto " + event.target.value + "%";
            }
        )
        // Import Images
        this.importImage.addEventListener(
            "input", (event) => {
                var filename = event.target.files[0].name;
                if(filename) {
                    this.logoDiv.style.backgroundImage = "url('components/imported/" + filename + "')";
                    this.importedImage.value = filename;
                    this.importedImage.innerHTML = filename;
                    this.imageSizeOption.style.display = "inline-flex";
                }
            }
        )

        /*************************** AUDIO ***************************/
        // Import Sound
        this.importSound.addEventListener(
            "input", (event) => {
                var filename = event.target.files[0].name;
                if(filename) {
                    this.selectedSound.src = "components/imported/" + filename;
                    this.soundToImport.innerHTML = filename;
                    this.sound = this.shadowRoot.querySelector("#audio-imported");
                    console.log(this.shadowRoot.querySelector("#audio-imported"));
                    // console.log(this.sound);
                    this.soundOptions.style.display = "inline-flex";
                }
            }
        )
        // Play and Pause Sound button
        this.playSound.addEventListener(
            "click", (event) => {
                console.log(this.sound)
                if(this.sound) {
                    if(this.soundPlay) {
                        this.sound.pause();
                        this.soundPlay = false;
                        this.playSound.value = "PLAY";
                    } else {
                        this.sound.play();
                        this.soundPlay = true;
                        this.playSound.value = "PAUSE";
                    }
                }
            }
        )
        // Stop sound button 
        this.stopSound.addEventListener(
            "click", (event) => {
                if(this.sound) this.sound.currentTime = 0;
            }
        )
        // Sound Selector and player
        this.soundSelector.addEventListener(
            "input", (event) => {
                if(event.target.value != "") {
                    console.log(event.target.value);
                    this.sound = this.shadowRoot.querySelector("#" + event.target.value);
                    this.soundOptions.style.display = "inline-flex";
                } else {
                    this.sound = null;
                    this.soundOptions.style.display = "none";
                }
            }
        )
        // Sound Volume Selector
        this.volumeSoundSelector.addEventListener(
            "input", (event) => {
                if(this.sound) this.sound.volume = event.target.value;
            }
        )
    }

}

customElements.define("my-logo", MyLogo);
