using System.Collections.Generic;
using FarseerPhysics.Collision.Shapes;
using FarseerPhysics.Common;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Factories;
using FarseerPhysics.Utility;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Audio;

namespace FarseerPhysics.Samples
{
    public class Pyramid
    {
        private Sprite _box;
        private List<Body> _boxes;
        private SpriteBatch _batch;
        private float width = 3f;
        private SoundEffect sound;
        public Texture2D tex;
        
        public Pyramid(World world, ScreenManager screenManager, Vector2 position, int count, float density)
        {
            _batch = screenManager.SpriteBatch;

            Vertices rect = PolygonTools.CreateRectangle(width / 2f, width / 2f);
            PolygonShape shape = new PolygonShape(rect, density);

            Vector2 rowStart = position;
            rowStart.Y -= 0.5f + count * width * 1.1f;

            Vector2 deltaRow = new Vector2(-(width + 0.2f) / 2f, width + 0.1f);
            float spacing = width + 0.5f;

            _boxes = new List<Body>();

            for (int i = 0; i < count; ++i)
            {
                Vector2 pos = rowStart;

                for (int j = 0; j < i + 1; ++j)
                {
                    Body body = BodyFactory.CreateBody(world);
                    body.BodyType = BodyType.Dynamic;
                    body.Position = pos;
                    body.OnCollision += Body_OnCollision;
                    body.CreateFixture(shape);
                    _boxes.Add(body);

                    pos.X += spacing;
                }

                rowStart += deltaRow;
            }

            sound = screenManager.Content.Load<SoundEffect>("Audio/Hit");
            tex = screenManager.Content.Load<Texture2D>("Assets/Box");
            //GFX
            _box = new Sprite(tex);
        }

        private bool Body_OnCollision(Fixture fixtureA, Fixture fixtureB, Dynamics.Contacts.Contact contact)
        {
            sound.Play();
            System.Console.WriteLine("Collide");
            return true;
        }

        public void Draw()
        {
            for (int i = 0; i < _boxes.Count; ++i)
            {
                _batch.Draw(_box.Texture, ConvertUnits.ToDisplayUnits(_boxes[i].Position), null, Color.White, _boxes[i].Rotation, new Vector2(_box.Texture.Width / 2f, _box.Texture.Height / 2f), (float)ConvertUnits.ToDisplayUnits(1f) * width / (float)_box.Texture.Width, SpriteEffects.None, 0f);
            }
        }
    }
}