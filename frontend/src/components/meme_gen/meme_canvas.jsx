import React from "react";
import FileUpload from "../file_upload/file_upload";
import { Redirect } from "react-router-dom";

class MemeCanvas extends React.Component {
  constructor(props) {
    super(props);
    //text input to null
    this.state = {
      topText: "",
      bottomText: "",
      textSize: 70,
      bottomTextSize: 70,
      allMemes: [],
      category: "app",
      image: props.memes,
      selected: 0,
      title: "",
      redirect: false,
    };

    this.canvasRef = null;
    this.imageRef = null;
    this.errorRef = React.createRef();

    //function to set CanvasRef to the element using reference callback
    this.setCanvasRef = (element) => {
      this.canvasRef = element;
    };

    this.setImageRef = (element) => {
      this.imageRef = element;
    };

    // this.focusCanvasRef = () => {
    //   // Focus the text input using the raw DOM API
    //   if (this.canvasRef) this.canvasRef.focus();
    // };

    this.updateValue = this.updateValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderImage = this.renderImage.bind(this);
    // this.handlePic = this.handlePic.bind(this);
    this.getImage = this.getImage.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  // handlePic(e){
  //   e.preventDefault()

  // }

  handleSelect(i) {
    this.setState({ selected: i });
    // ;
    // let pic = document.getElementById("grumpy").src = `${
    //   Object.values(this.props.memes)[this.state.selected].img
    // }`;
    let pic = document.getElementById("grumpy");
    // ;
    let imgurl = Object.values(this.props.memes)[i].img;
    // ;
    pic.src = imgurl;
    // ;
  }

  updateValue(value) {
    //  ;
    return (e) => {
      e.preventDefault();
      this.setState({ [value]: e.target.value });
    };
  }

  getImage() {
    // // ;
    // this.props.fetchMeme("601b7e9d6179d448b2350485").then((image) => {
    //   let buffer = image.meme.data.img.data.data;
    // let img = this._arrayBufferToBase64(buffer);
    // let img = function _arrayBufferToBase64(buffer) {
    //   var binary = "";
    //   var bytes = new Uint8Array(buffer);
    //   var len = bytes.byteLength;
    //   for (var i = 0; i < len; i++) {
    //     binary += String.fromCharCode(bytes[i]);
    //   }
    //   return window.btoa(binary);
    // };
    // <img src={"data:image/png;base64," + Data.Photo} />;
    // this.setState({ image: "data:image/png;base64," + img });
    // });
  }

  // _arrayBufferToBase64(buffer) {
  //   var binary = "";
  //   var bytes = new Uint8Array(buffer);
  //   var len = bytes.byteLength;
  //   for (var i = 0; i < len; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return window.btoa(binary);
  // }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.title === "") {
      this.errorRef.current.className = "title-error";
      return null;
    }

    let image = this.renderImage();
    // ;
  }

  renderImage() {
    let meme = this.canvasRef.toDataURL("image/jpeg", 0.5);
    let title = this.state.title;
    let tags = this.state.category;
    let creatorId = this.props.currentUser
    // ;
    this.props
      .postMeme({ title: title, img: meme, tags: tags, creatorId: creatorId })
      .then(() => {
        this.setState({ redirect: true })
      })
  }

  componentDidMount() {
    // ;

    // this.props.fetchMeme("601c3997765dd88b1c406f1d");
    // this.props.fetchTemplate("601c58fe00fa3dd36b44a7b9");
    this.props.fetchTemplates();

    // ;
    const canvas = this.canvasRef;
    //  ;
    const ctx = canvas.getContext("2d");
    const image = this.imageRef;

    // image.onload = () => {
    //   ctx.drawImage(
    //     image,
    //     0,
    //     0,
    //     image.width,
    //     image.height, // source rectangle
    //     0,
    //     0,
    //     canvas.width,
    //     canvas.height
    //   );
    // };
    // ;

    // fetch("https://api.imgflip.com/get_memes")
    //   .then((response) => response.json())
    //   .then((response) => {
    //     const { memes } = response.data;

    //     this.setState({
    //       allMemes: memes,
    //     });
    //   });
  }

  componentDidUpdate(prevProps) {
    if (this.props.memes !== prevProps.memes) {
      this.setState({ image: this.props.memes });
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    // ;
    // if (Object.keys(this.props.memes).length === 0) return null;
    let imageUrl = "";
    //only after initial render of canvas and image:
    if (this.canvasRef) {
      // ;
      if (Object.values(this.props.memes)[0]) {
        // imageUrl = this.props._arrayBufferToBase64(
        //   Object.values(this.props.memes)[0].data
        // );

        // imageUrl = Object.values(this.props.memes)[this.state.selected].img;
        imageUrl = Object.values(this.props.memes)[this.state.selected].img;
      }
      //
      //  ;
      const canvas = this.canvasRef;
      // //  ;
      // ;
      const image = this.imageRef;
      let ctx = this.canvasRef.getContext("2d");
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height, // source rectangle
        0,
        0,
        canvas.width,
        canvas.height
      );
      //  ;

      let x = canvas.width / 2;
      let y = canvas.height / 5;
      ctx.font = `bolder ${this.state.topTextSize}px Helvetica`;
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.fillText(this.state.topText, x, y);
      ctx.strokeText(this.state.topText, x, y);

      let z = canvas.width / 2;
      let v = 450;
      ctx.font = `bolder ${this.state.bottomTextSize}px Helvetica`;
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.fillText(this.state.bottomText, z, v);
      ctx.strokeText(this.state.bottomText, z, v);
    }

    // display none set to image so it doesnt' on top of canvas element. rendering of the image happens inside of the componentDidMount()
    const imgStyle = {
      display: "none",
    };

    // meme template code

    const allMemes = Object.values(this.props.templates);

    // ;
    let boxCount = [];

    // const boxMemes = allMemes.map((meme) => {
    //   if (meme.box_count <= 2) {
    //     boxCount.push(meme);
    //   }
    // });

    const featureMemes = allMemes.map((meme, i) => {
      return (
        <img
          src={meme.img}
          className={"meme-template-inner"}
          onClick={() => this.handleSelect(i)}
        />
      );
    });

    return (
      <div className="main-canvas">
        {this.renderRedirect()}
        <div className="select-img">
          {/* <h1 className="table-header">Select Your Meme Template</h1> */}
          <div className="img-table">
            <h1 className="table-header">Select Your Meme Template</h1>
            {featureMemes}
          </div>
        </div>

        <div className="canvas-creator">
          {/* <canvas ref={this.setCanvasRef} width={500} height={500} /> */}
          <canvas
            ref={this.setCanvasRef}
            width={500}
            height={500}
            className="meme-pic"
          />
          <img
            src={imageUrl}
            alt="grumpy cat"
            style={imgStyle}
            ref={this.setImageRef}
            crossOrigin="anonymous"
            id="grumpy"
          />
        </div>

        <div className="img-config">
          <div className="meme-form">
            <label>
              Title
              <br />
              <input
                className="title-canvas"
                type="text"
                onChange={this.updateValue("title")}
                value={this.state.title}
                // required
              />
              <div ref={this.errorRef} className="hidden">
                * Title Cannot Be Blank
              </div>
            </label>

            <br />
            <label value="topText" className="top-header">
              Top Text
            </label>
            <br />
            <input
              type="text"
              onChange={this.updateValue("topText")}
              value={this.state.topText}
            />
            <br />
            <label value="bottomText">Bottom Text</label>
            <br />
            <input
              type="text"
              onChange={this.updateValue("bottomText")}
              value={this.state.bottomText}
            />
            <br />
            <label value="top text size">Top Text Size</label>
            <br />
            <input
              type="range"
              min="12"
              max="100"
              defaultValue={this.state.topTextSize}
              onChange={this.updateValue("topTextSize")}
            />
            <br />
            <label value="bottom text size">Bottom Text Size</label>
            <br />
            <input
              type="range"
              min="12"
              max="100"
              defaultValue={this.state.bottomTextSize}
              onChange={this.updateValue("bottomTextSize")}
            />
            <br />
            <label>Select categrory</label>
            <br />
            <select
              className="category-select"
              onChange={this.updateValue("category")}
            >
              <option value="app">App Academy</option>
              <option value="animals">Animals</option>
              <option value="anime">Anime</option>
              <option value="gaming">Gaming</option>
              <option value="tv">Tv Shows</option>
              <option value="movies">Movies</option>
              <option value="politics">Politics</option>
              <option value="sports">Sports</option>
              <option value="internet">Internet</option>
            </select>
          </div>
          <form onSubmit={this.handleSubmit}>
            <button value="generateMeme" className="generate-meme-button">
              Generate Meme
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MemeCanvas;

// form to change text.
// options to change text attributs, style, color, shape?!
// sliders to adjust sizing of image.
