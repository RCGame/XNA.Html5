using FarseerPhysics.Common;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Factories;
using FarseerPhysics.Utility;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Audio;

namespace FarseerPhysics.Samples
{
    public class Agent
    {
        private Body _agentBody;
        private Sprite sprite;
        private SpriteBatch _batch;
        private SoundEffect sound;
        private float radius = 2f;
        private Fixture a, b;

        public Agent(World world, ScreenManager screenManager, Vector2 position)
        {
            _batch = screenManager.SpriteBatch;

            _agentBody = BodyFactory.CreateCircle(world, radius, 1f);
            _agentBody.Mass = 20f;
            _agentBody.BodyType = BodyType.Dynamic;
            _agentBody.Restitution = 0.5f;
            _agentBody.Position = position;
            _agentBody.OnCollision += _agentBody_OnCollision;
            _agentBody.OnSeparation += _agentBody_OnSeparation;
            sound = screenManager.Content.Load<SoundEffect>("Audio/Collision");
            var tex = screenManager.Content.Load<Texture2D>("Assets/Ball");

            //GFX
            sprite = new Sprite(tex);
        }

        private void _agentBody_OnSeparation(Fixture fixtureA, Fixture fixtureB)
        {
        }

        private bool _agentBody_OnCollision(Fixture fixtureA, Fixture fixtureB, Dynamics.Contacts.Contact contact)
        {
            if (!(fixtureA == a && fixtureB == b || fixtureA == b && fixtureB == a))
            {
                sound.Play();
            }
            a = fixtureA;
            b = fixtureB;
            return true;
        }

        public Body Body
        {
            get { return _agentBody; }
        }

        public void Draw()
        {
            _batch.Draw(sprite.Texture, ConvertUnits.ToDisplayUnits(_agentBody.Position), null, Color.White, _agentBody.Rotation, new Vector2(sprite.Texture.Width / 2f, sprite.Texture.Height / 2f), (float)ConvertUnits.ToDisplayUnits(1f) * radius * 2f / (float)sprite.Texture.Width, SpriteEffects.None, 0f);
        }
    }
}