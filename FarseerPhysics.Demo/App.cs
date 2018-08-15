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
            if (CustomScripts.IsMobileDevice())
            {
                HTMLButtonElement button = new HTMLButtonElement();
                button.InnerHTML = "Fullscreen Experience (use landscape)";
                button.SetAttribute("style", CustomScripts.FullScreenButtonStyle);

                button.OnClick = (e) =>
                {
                    CustomScripts.RequestFullScreen();
                    Document.Body.RemoveChild(button);
                    RunGame();
                };
                Document.Body.AppendChild(button);
            }
            else
            {
                RunGame();
            }
        }

        public static void RunGame()
        {
            PhysicsGame game = new PhysicsGame();
            game.Run();
        }
    }
}