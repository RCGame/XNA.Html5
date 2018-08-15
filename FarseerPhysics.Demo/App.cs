using System;
using System.Collections.Generic;
using System.Linq;
using Bridge;
using Bridge.Html5;
using Microsoft.Xna.Framework;
using FarseerPhysics.Samples;
using Microsoft.Xna.Framework.Graphics;

namespace FarseerPhysics.Demo
{
    public class App
    {
        private static PhysicsGame game;

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
                Html5.OnResize = () =>
                {
                    if (game != null)
                    {
                        if (Window.InnerWidth < Window.InnerHeight)
                        {
                            if (game.IsActive)
                            {
                                game.IsActive = false;
                                Document.Body.RemoveChild(Html5.Canvas);
                                Document.Body.AppendChild(button);
                            }
                        }
                        else
                        {
                            if (!game.IsActive)
                            {
                                Document.Body.RemoveChild(button);
                                Document.Body.AppendChild(Html5.Canvas);
                                game.IsActive = true;
                            }
                        }
                    }
                };
            }
            else
            {
                RunGame();
            }
        }

        public static void RunGame()
        {
            game = new PhysicsGame();
            game.Run();
        }
    }
}