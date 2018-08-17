using System;
using System.Collections.Generic;
using System.Linq;
using Bridge;

namespace FarseerPhysics.Demo
{
    public class CustomScripts
    {
        public const string FullScreenButtonStyle = @"position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    font-size: 30px;";

        public static void RequestFullScreen()
        {
            Script.Write(@"if (document.body.requestFullscreen) {
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
        }

        public static bool IsMobileDevice()
        {
            return Script.Write<bool>("window.orientation !== undefined");
        }

        public static bool IsFullScreen()
        {
            return Script.Write<bool>("document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen");
        }
    }
}