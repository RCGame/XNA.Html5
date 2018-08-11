using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Graphics;

namespace Microsoft.Xna.Framework.Input
{
    public class Mouse
    {
        public static MouseState GetState()
        {
            var mouse = new MouseState();
            if (Html5.MouseState != null)
            {
                mouse = Html5.MouseState;
            }
            else
            {
                mouse.LeftButton = ButtonState.None;
            }
            return mouse;
        } 
    }
}
