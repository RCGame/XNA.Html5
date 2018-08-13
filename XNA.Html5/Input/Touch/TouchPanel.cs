using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Graphics;

namespace Microsoft.Xna.Framework.Input.Touch
{
    public class TouchPanel
    {
        public static GestureType EnabledGestures { get; set; }
        internal static bool didPress;

        public static TouchCollection GetState()
        {
            if (Html5.Touches.Count > 0)
            {
                switch (Html5.Touches[0].State)
                {
                    case TouchLocationState.Pressed:
                        if (!didPress)
                        {
                            didPress = true;
                            return new TouchCollection(Html5.Touches.ToArray());
                        }
                        break;
                    case TouchLocationState.Moved:
                        if (didPress)
                        {
                            return new TouchCollection(Html5.Touches.ToArray());
                        }
                        break;
                    case TouchLocationState.Released:
                        if (didPress)
                        {
                            didPress = false;
                            return new TouchCollection(Html5.Touches.ToArray());
                        }
                        break;
                }
            }
            return new TouchCollection();
        }
    }
}
