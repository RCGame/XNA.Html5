using System;
using System.Collections.Generic;
using System.Linq;
using Bridge;
using Bridge.Html5;
using Microsoft.Xna.Framework;
using FarseerPhysics.Samples;

namespace FarseerPhysics.Demo
{
    public class App
    {
        public static void Main()
        {
            HTMLButtonElement button = new HTMLButtonElement();
            button.InnerHTML = "Fullscreen Experience (use landscape)";
            button.SetAttribute("style", 
                @"position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    font-size: 30px;");

            button.OnClick = (e) =>
            {
                Script.Write(
                    @"if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
            }
    else if (document.body.mozRequestFullScreen)
            {
                document.body.mozRequestFullScreen();
            }
            else if (document.body.webkitRequestFullscreen)
            {
                document.body.webkitRequestFullscreen();
            }
            else if (document.body.msRequestFullscreen)
            {
                document.body.msRequestFullscreen();
            }
            ");
                Document.Body.RemoveChild(button);
                PhysicsGame game = new PhysicsGame();
                game.Run();
            };
            Document.Body.AppendChild(button);
        }
    }
}