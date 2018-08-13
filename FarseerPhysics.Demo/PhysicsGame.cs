using System;
using FarseerPhysics.Samples.Demos;
using FarseerPhysics.Utility;
using Microsoft.Xna.Framework;

namespace FarseerPhysics.Samples
{
    /// <summary>
    /// This is the main type for your game
    /// </summary>
    public class PhysicsGame : Game
    {
        private GraphicsDeviceManager _graphics;

        public PhysicsGame()
        {
            _graphics = new GraphicsDeviceManager(this);
            //_graphics.PreferredBackBufferWidth = 1900;
            //_graphics.PreferredBackBufferHeight = 1000;
            ConvertUnits.SetDisplayUnitToSimUnitRatio((float)GraphicsDevice.Viewport.Height / 35f);
            IsFixedTimeStep = true;
            _graphics.IsFullScreen = false;

            Content.RootDirectory = "Content";

            //new-up components and add to Game.Components
            ScreenManager = new ScreenManager(this);
            Components.Add(ScreenManager);

        }

        public ScreenManager ScreenManager { get; set; }

        /// <summary>
        /// Allows the game to perform any initialization it needs to before starting to run.
        /// This is where it can query for any required services and load any non-graphic
        /// related content.  Calling base.Initialize will enumerate through any components
        /// and initialize them as well.
        /// </summary>
        protected override void Initialize()
        {
            base.Initialize();

            DemoGameScreen demo = new DemoGameScreen(ScreenManager);


            ScreenManager.AddScreen(demo);
        }
    }
}