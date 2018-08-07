/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.2.0
 */
Bridge.assembly("FarseerPhysics.Demo", function ($asm, globals) {
    "use strict";

    Bridge.define("FarseerPhysics.Demo.App", {
        main: function Main () {
            var game = new Microsoft.Xna.Framework.Game();
            game.Run();
        }
    });

    Bridge.define("FarseerPhysics.Samples.Demos.DemoGameScreen", {
        inherits: [FarseerPhysics.Utility.PhysicsGameScreen],
        statics: {
            fields: {
                PyramidBaseBodyCount: 0
            },
            ctors: {
                init: function () {
                    this.PyramidBaseBodyCount = 14;
                }
            }
        },
        fields: {
            background: null,
            _pyramid: null
        },
        ctors: {
            ctor: function (screenManager) {
                this.$initialize();
                FarseerPhysics.Utility.PhysicsGameScreen.ctor.call(this, screenManager);
            }
        },
        methods: {
            LoadContent: function () {
                FarseerPhysics.Utility.PhysicsGameScreen.prototype.LoadContent.call(this);

                this.World.Gravity = new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 20.0);
                this.background = this.ScreenManager.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "Assets/Background");
                this._pyramid = new FarseerPhysics.Samples.Pyramid(this.World, this.ScreenManager, new Microsoft.Xna.Framework.Vector2.$ctor2(12.0, 12.0), FarseerPhysics.Samples.Demos.DemoGameScreen.PyramidBaseBodyCount, 1.0);
                var body = FarseerPhysics.Factories.BodyFactory.CreateRectangle(this.World, 100.0, 20.0, 1.0);
                body.BodyType = FarseerPhysics.Dynamics.BodyType.Static;
                body.Friction = 2.0;
                body.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 26.3);
            },
            Draw: function (gameTime) {
                this.ScreenManager.SpriteBatch.Begin$1(0, null, null, null, null, null, null);
                this.ScreenManager.SpriteBatch.Draw$1(this.background, new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 0.0), null, Microsoft.Xna.Framework.Color.White.$clone(), 0.0, new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 0.0), 1.0, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0.0);
                this.ScreenManager.SpriteBatch.End();
                this.ScreenManager.SpriteBatch.Begin$1(0, null, null, null, null, null, this.Camera.View.$clone());
                this._pyramid.Draw();
                this.ScreenManager.SpriteBatch.End();
                FarseerPhysics.Utility.PhysicsGameScreen.prototype.Draw.call(this, gameTime);
            }
        }
    });

    /** @namespace FarseerPhysics.Samples */

    /**
     * This is the main type for your game
     *
     * @public
     * @class FarseerPhysics.Samples.PhysicsGame
     * @augments Microsoft.Xna.Framework.Game
     */
    Bridge.define("FarseerPhysics.Samples.PhysicsGame", {
        inherits: [Microsoft.Xna.Framework.Game],
        fields: {
            _graphics: null,
            ScreenManager: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Game.ctor.call(this);
                this._graphics = new Microsoft.Xna.Framework.GraphicsDeviceManager(this);
                FarseerPhysics.Utility.ConvertUnits.SetDisplayUnitToSimUnitRatio(24.0);
                this.IsFixedTimeStep = true;
                this._graphics.IsFullScreen = false;

                this.Content.RootDirectory = "Content";

                this.ScreenManager = new FarseerPhysics.Utility.ScreenManager(this);
                this.Components.add(this.ScreenManager);

            }
        },
        methods: {
            /**
             * Allows the game to perform any initialization it needs to before starting to run.
             This is where it can query for any required services and load any non-graphic
             related content.  Calling base.Initialize will enumerate through any components
             and initialize them as well.
             *
             * @instance
             * @protected
             * @override
             * @this FarseerPhysics.Samples.PhysicsGame
             * @memberof FarseerPhysics.Samples.PhysicsGame
             * @return  {void}
             */
            Initialize: function () {
                Microsoft.Xna.Framework.Game.prototype.Initialize.call(this);

                var demo = new FarseerPhysics.Samples.Demos.DemoGameScreen(this.ScreenManager);


                this.ScreenManager.AddScreen(demo);
            }
        }
    });

    Bridge.define("FarseerPhysics.Samples.Pyramid", {
        fields: {
            _box: null,
            _boxes: null,
            _batch: null,
            width: 0
        },
        ctors: {
            init: function () {
                this._box = new FarseerPhysics.Utility.Sprite();
                this.width = 1.5;
            },
            ctor: function (world, screenManager, position, count, density) {
                this.$initialize();
                this._batch = screenManager.SpriteBatch;

                var rect = FarseerPhysics.Common.PolygonTools.CreateRectangle(this.width / 2.0, this.width / 2.0);
                var shape = new FarseerPhysics.Collision.Shapes.PolygonShape.$ctor1(rect, density);

                var rowStart = position.$clone();
                rowStart.Y -= 0.5 + count * this.width * 1.1;

                var deltaRow = new Microsoft.Xna.Framework.Vector2.$ctor2(-(this.width + 0.2) / 2.0, this.width + 0.1);
                var spacing = this.width + 0.2;

                this._boxes = new (System.Collections.Generic.List$1(FarseerPhysics.Dynamics.Body)).ctor();

                for (var i = 0; i < count; i = (i + 1) | 0) {
                    var pos = rowStart.$clone();

                    for (var j = 0; j < ((i + 1) | 0); j = (j + 1) | 0) {
                        var body = FarseerPhysics.Factories.BodyFactory.CreateBody(world);
                        body.BodyType = FarseerPhysics.Dynamics.BodyType.Dynamic;
                        body.Position = pos.$clone();
                        body.CreateFixture(shape);
                        this._boxes.add(body);

                        pos.X += spacing;
                    }

                    rowStart = Microsoft.Xna.Framework.Vector2.op_Addition(rowStart.$clone(), deltaRow.$clone());
                }

                var tex = screenManager.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "Assets/Box");
                this._box = new FarseerPhysics.Utility.Sprite.$ctor1(tex);
            }
        },
        methods: {
            Draw: function () {
                for (var i = 0; i < this._boxes.Count; i = (i + 1) | 0) {
                    this._batch.Draw$1(this._box.Texture, FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits(this._boxes.getItem(i).Position.$clone()), null, Microsoft.Xna.Framework.Color.White.$clone(), this._boxes.getItem(i).Rotation, this._box.Origin.$clone(), FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits$4(1.0) * this.width / this._box.Texture.Width, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0.0);
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYXJzZWVyUGh5c2ljcy5EZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJEZW1vR2FtZVNjcmVlbi5jcyIsIlBoeXNpY3NHYW1lLmNzIiwiUHlyYW1pZC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWFZQSxXQUFZQSxJQUFJQTtZQUNoQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNLa0JBOzt5RUFBb0NBOzs7OztnQkFNdERBOztnQkFFQUEscUJBQWdCQSxJQUFJQTtnQkFDcEJBLGtCQUFhQTtnQkFDYkEsZ0JBQVdBLElBQUlBLCtCQUFRQSxZQUFPQSxvQkFBZUEsSUFBSUEsb0RBQW1CQTtnQkFDcEVBLFdBQVlBLHFEQUE0QkE7Z0JBQ3hDQSxnQkFBZ0JBO2dCQUNoQkE7Z0JBQ0FBLGdCQUFnQkEsSUFBSUE7OzRCQUdFQTtnQkFFdEJBLDBDQUFtQ0EsTUFBTUEsTUFBTUEsTUFBTUEsTUFBTUEsTUFBTUE7Z0JBQ2pFQSxzQ0FBK0JBLGlCQUFZQSxJQUFJQSxrREFBaUJBLE1BQU1BLG1EQUFpQkEsSUFBSUEsdURBQXFCQTtnQkFDaEhBO2dCQUNBQSwwQ0FBbUNBLE1BQU1BLE1BQU1BLE1BQU1BLE1BQU1BLE1BQU1BO2dCQUNqRUE7Z0JBQ0FBO2dCQUNBQSxtRUFBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkM1QlZBLGlCQUFZQSxJQUFJQSw4Q0FBc0JBO2dCQUd0Q0E7Z0JBQ0FBO2dCQUNBQTs7Z0JBRUFBOztnQkFHQUEscUJBQWdCQSxJQUFJQSxxQ0FBY0E7Z0JBQ2xDQSxvQkFBZUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBY2ZBOztnQkFFQUEsV0FBc0JBLElBQUlBLDRDQUFlQTs7O2dCQUd6Q0EsNkJBQXdCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDN0JiQSxPQUFhQSxlQUE2QkEsVUFBa0JBLE9BQVdBOztnQkFFbEZBLGNBQVNBOztnQkFFVEEsV0FBZ0JBLG1EQUE2QkEsa0JBQVlBO2dCQUN6REEsWUFBcUJBLElBQUlBLG9EQUFhQSxNQUFNQTs7Z0JBRTVDQSxlQUFtQkE7Z0JBQ25CQSxjQUFjQSxNQUFPQSxRQUFRQTs7Z0JBRTdCQSxlQUFtQkEsSUFBSUEsdUNBQVFBLENBQUNBLENBQUNBLHlCQUFvQkE7Z0JBQ3JEQSxjQUFnQkE7O2dCQUVoQkEsY0FBU0EsS0FBSUE7O2dCQUViQSxLQUFLQSxXQUFXQSxJQUFJQSxPQUFTQTtvQkFFekJBLFVBQWNBOztvQkFFZEEsS0FBS0EsV0FBV0EsSUFBSUEsZUFBU0E7d0JBRXpCQSxXQUFZQSxnREFBdUJBO3dCQUNuQ0EsZ0JBQWdCQTt3QkFDaEJBLGdCQUFnQkE7d0JBQ2hCQSxtQkFBbUJBO3dCQUNuQkEsZ0JBQVdBOzt3QkFFWEEsU0FBU0E7OztvQkFHYkEsMEVBQVlBOzs7Z0JBR2hCQSxVQUFVQTtnQkFFVkEsWUFBT0EsSUFBSUEscUNBQU9BOzs7OztnQkFLbEJBLEtBQUtBLFdBQVdBLElBQUlBLG1CQUFnQkE7b0JBRWhDQSxtQkFBWUEsbUJBQWNBLG1EQUE0QkEsb0JBQU9BLHVCQUFjQSxNQUFNQSw4Q0FBYUEsb0JBQU9BLGFBQWFBLDJCQUFhQSxBQUFPQSw0REFBa0NBLGFBQVFBLEFBQU9BLHlCQUFvQkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5EZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lIGdhbWUgPSBuZXcgR2FtZSgpO1xyXG4gICAgICAgICAgICBnYW1lLlJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db2xsaXNpb24uU2hhcGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzLkRlbW9zXHJcbntcclxuICAgIGludGVybmFsIGNsYXNzIERlbW9HYW1lU2NyZWVuIDogUGh5c2ljc0dhbWVTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGludCBQeXJhbWlkQmFzZUJvZHlDb3VudCA9IDE0O1xyXG4gICAgICAgIHByaXZhdGUgVGV4dHVyZTJEIGJhY2tncm91bmQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgUHlyYW1pZCBfcHlyYW1pZDtcclxuXHJcbiAgICAgICAgcHVibGljIERlbW9HYW1lU2NyZWVuKFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlcikgOiBiYXNlKHNjcmVlbk1hbmFnZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Mb2FkQ29udGVudCgpO1xyXG5cclxuICAgICAgICAgICAgV29ybGQuR3Jhdml0eSA9IG5ldyBWZWN0b3IyKDBmLCAyMGYpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kID0gU2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIkFzc2V0cy9CYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgICAgICBfcHlyYW1pZCA9IG5ldyBQeXJhbWlkKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMigxMmYsIDEyZiksIFB5cmFtaWRCYXNlQm9keUNvdW50LCAxZik7XHJcbiAgICAgICAgICAgIEJvZHkgYm9keSA9IEJvZHlGYWN0b3J5LkNyZWF0ZVJlY3RhbmdsZShXb3JsZCwgMTAwZiwgMjBmLCAxZik7XHJcbiAgICAgICAgICAgIGJvZHkuQm9keVR5cGUgPSBCb2R5VHlwZS5TdGF0aWM7XHJcbiAgICAgICAgICAgIGJvZHkuRnJpY3Rpb24gPSAyZjtcclxuICAgICAgICAgICAgYm9keS5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IyKDBmLCAyNi4zZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBEcmF3KEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5CZWdpbigwLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5EcmF3KGJhY2tncm91bmQsIG5ldyBWZWN0b3IyKDBmLCAwZiksIG51bGwsIENvbG9yLldoaXRlLCAwZiwgbmV3IFZlY3RvcjIoMGYsIDBmKSwgMWYsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkVuZCgpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkJlZ2luKDAsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIENhbWVyYS5WaWV3KTtcclxuICAgICAgICAgICAgX3B5cmFtaWQuRHJhdygpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkVuZCgpO1xyXG4gICAgICAgICAgICBiYXNlLkRyYXcoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcy5EZW1vcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVGhpcyBpcyB0aGUgbWFpbiB0eXBlIGZvciB5b3VyIGdhbWVcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgUGh5c2ljc0dhbWUgOiBHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBHcmFwaGljc0RldmljZU1hbmFnZXIgX2dyYXBoaWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgUGh5c2ljc0dhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2dyYXBoaWNzID0gbmV3IEdyYXBoaWNzRGV2aWNlTWFuYWdlcih0aGlzKTtcclxuICAgICAgICAgICAgLy9fZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlcldpZHRoID0gMTkwMDtcclxuICAgICAgICAgICAgLy9fZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlckhlaWdodCA9IDEwMDA7XHJcbiAgICAgICAgICAgIENvbnZlcnRVbml0cy5TZXREaXNwbGF5VW5pdFRvU2ltVW5pdFJhdGlvKDI0Zik7XHJcbiAgICAgICAgICAgIElzRml4ZWRUaW1lU3RlcCA9IHRydWU7XHJcbiAgICAgICAgICAgIF9ncmFwaGljcy5Jc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG5cclxuICAgICAgICAgICAgLy9uZXctdXAgY29tcG9uZW50cyBhbmQgYWRkIHRvIEdhbWUuQ29tcG9uZW50c1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyID0gbmV3IFNjcmVlbk1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIENvbXBvbmVudHMuQWRkKFNjcmVlbk1hbmFnZXIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTY3JlZW5NYW5hZ2VyIFNjcmVlbk1hbmFnZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBwZXJmb3JtIGFueSBpbml0aWFsaXphdGlvbiBpdCBuZWVkcyB0byBiZWZvcmUgc3RhcnRpbmcgdG8gcnVuLlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIHdoZXJlIGl0IGNhbiBxdWVyeSBmb3IgYW55IHJlcXVpcmVkIHNlcnZpY2VzIGFuZCBsb2FkIGFueSBub24tZ3JhcGhpY1xyXG4gICAgICAgIC8vLyByZWxhdGVkIGNvbnRlbnQuICBDYWxsaW5nIGJhc2UuSW5pdGlhbGl6ZSB3aWxsIGVudW1lcmF0ZSB0aHJvdWdoIGFueSBjb21wb25lbnRzXHJcbiAgICAgICAgLy8vIGFuZCBpbml0aWFsaXplIHRoZW0gYXMgd2VsbC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICBEZW1vR2FtZVNjcmVlbiBkZW1vID0gbmV3IERlbW9HYW1lU2NyZWVuKFNjcmVlbk1hbmFnZXIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuQWRkU2NyZWVuKGRlbW8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db2xsaXNpb24uU2hhcGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQeXJhbWlkXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGUgX2JveDtcclxuICAgICAgICBwcml2YXRlIExpc3Q8Qm9keT4gX2JveGVzO1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlQmF0Y2ggX2JhdGNoO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgd2lkdGggPSAxLjVmO1xyXG4gICAgICAgIHB1YmxpYyBQeXJhbWlkKFdvcmxkIHdvcmxkLCBTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIsIFZlY3RvcjIgcG9zaXRpb24sIGludCBjb3VudCwgZmxvYXQgZGVuc2l0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaCA9IHNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2g7XHJcblxyXG4gICAgICAgICAgICBWZXJ0aWNlcyByZWN0ID0gUG9seWdvblRvb2xzLkNyZWF0ZVJlY3RhbmdsZSh3aWR0aCAvIDJmLCB3aWR0aCAvIDJmKTtcclxuICAgICAgICAgICAgUG9seWdvblNoYXBlIHNoYXBlID0gbmV3IFBvbHlnb25TaGFwZShyZWN0LCBkZW5zaXR5KTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgcm93U3RhcnQgPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgcm93U3RhcnQuWSAtPSAwLjVmICsgY291bnQgKiB3aWR0aCAqIDEuMWY7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IyIGRlbHRhUm93ID0gbmV3IFZlY3RvcjIoLSh3aWR0aCArIDAuMmYpIC8gMmYsIHdpZHRoICsgMC4xZik7XHJcbiAgICAgICAgICAgIGZsb2F0IHNwYWNpbmcgPSB3aWR0aCArIDAuMmY7XHJcblxyXG4gICAgICAgICAgICBfYm94ZXMgPSBuZXcgTGlzdDxCb2R5PigpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb3VudDsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHBvcyA9IHJvd1N0YXJ0O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgaSArIDE7ICsrailcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBCb2R5IGJvZHkgPSBCb2R5RmFjdG9yeS5DcmVhdGVCb2R5KHdvcmxkKTtcclxuICAgICAgICAgICAgICAgICAgICBib2R5LkJvZHlUeXBlID0gQm9keVR5cGUuRHluYW1pYztcclxuICAgICAgICAgICAgICAgICAgICBib2R5LlBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuQ3JlYXRlRml4dHVyZShzaGFwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2JveGVzLkFkZChib2R5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zLlggKz0gc3BhY2luZztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByb3dTdGFydCArPSBkZWx0YVJvdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRleCA9IHNjcmVlbk1hbmFnZXIuQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJBc3NldHMvQm94XCIpO1xyXG4gICAgICAgICAgICAvL0dGWFxyXG4gICAgICAgICAgICBfYm94ID0gbmV3IFNwcml0ZSh0ZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IF9ib3hlcy5Db3VudDsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfYmF0Y2guRHJhdyhfYm94LlRleHR1cmUsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cyhfYm94ZXNbaV0uUG9zaXRpb24pLCBudWxsLCBDb2xvci5XaGl0ZSwgX2JveGVzW2ldLlJvdGF0aW9uLCBfYm94Lk9yaWdpbiwgKGZsb2F0KUNvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiB3aWR0aCAvIChmbG9hdClfYm94LlRleHR1cmUuV2lkdGgsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=
