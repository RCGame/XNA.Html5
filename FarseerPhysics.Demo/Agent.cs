using FarseerPhysics.Common;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Factories;
using FarseerPhysics.Utility;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace FarseerPhysics.Samples
{
    public class Agent
    {
        private Body _agentBody;
        private Sprite sprite;
        private SpriteBatch _batch;
        private float radius = 1.5f;

        public Agent(World world, ScreenManager screenManager, Vector2 position)
        {
            _batch = screenManager.SpriteBatch;

            _agentBody = BodyFactory.CreateCircle(world, radius, 1f);
            _agentBody.Mass = 20f;
            _agentBody.BodyType = BodyType.Dynamic;
            _agentBody.Restitution = 0.5f;
            _agentBody.Position = position;
            var tex = screenManager.Content.Load<Texture2D>("Assets/Ball");
            //GFX
            sprite = new Sprite(tex);
        }

        public Body Body
        {
            get { return _agentBody; }
        }

        public void Draw()
        {
            _batch.Draw(sprite.Texture, ConvertUnits.ToDisplayUnits(_agentBody.Position), null, Color.White, _agentBody.Rotation, sprite.Origin, (float)ConvertUnits.ToDisplayUnits(1f) * radius * 2f / (float)sprite.Texture.Width, SpriteEffects.None, 0f);
        }
    }
}