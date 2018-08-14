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
            button.SetAttribute("style", CustomScripts.FullScreenButtonStyle);

            button.OnClick = (e) =>
            {
                CustomScripts.RequestFullScreen();
                Document.Body.RemoveChild(button);
                PhysicsGame game = new PhysicsGame();
                game.Run();
            };
            Document.Body.AppendChild(button);
        }
    }
}