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
            PhysicsGame game = new PhysicsGame();
            game.Run();
        }
    }
}