using System.Text;
using FarseerPhysics.Samples;
using FarseerPhysics.Collision.Shapes;
using FarseerPhysics.Common;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Factories;
using FarseerPhysics.Utility;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace FarseerPhysics.Samples.Demos
{
    internal class DemoGameScreen : PhysicsGameScreen
    {
        private const int PyramidBaseBodyCount = 14;
        private Texture2D background;

        private Pyramid _pyramid;

        public DemoGameScreen(ScreenManager screenManager) : base(screenManager)
        {
        }

        public override void LoadContent()
        {
            base.LoadContent();

            World.Gravity = new Vector2(0f, 20f);
            background = ScreenManager.Content.Load<Texture2D>("Assets/Background");
            _pyramid = new Pyramid(World, ScreenManager, new Vector2(12f, 12f), PyramidBaseBodyCount, 1f);
            Body body = BodyFactory.CreateRectangle(World, 100f, 20f, 1f);
            body.BodyType = BodyType.Static;
            body.Friction = 2f;
            body.Position = new Vector2(0f, 26.3f);
        }

        public override void Draw(GameTime gameTime)
        {
            ScreenManager.SpriteBatch.Begin(0, null, null, null, null, null, null);
            ScreenManager.SpriteBatch.Draw(background, new Vector2(0f, 0f), null, Color.White, 0f, new Vector2(0f, 0f), 1f, SpriteEffects.None, 0f);
            ScreenManager.SpriteBatch.End();
            ScreenManager.SpriteBatch.Begin(0, null, null, null, null, null, Camera.View);
            _pyramid.Draw();
            ScreenManager.SpriteBatch.End();
            base.Draw(gameTime);
        }
    }
}