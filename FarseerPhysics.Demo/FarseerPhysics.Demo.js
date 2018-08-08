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

    Bridge.define("FarseerPhysics.Samples.Agent", {
        fields: {
            _agentBody: null,
            sprite: null,
            _batch: null,
            radius: 0
        },
        props: {
            Body: {
                get: function () {
                    return this._agentBody;
                }
            }
        },
        ctors: {
            init: function () {
                this.sprite = new FarseerPhysics.Utility.Sprite();
                this.radius = 1.5;
            },
            ctor: function (world, screenManager, position) {
                this.$initialize();
                this._batch = screenManager.SpriteBatch;

                this._agentBody = FarseerPhysics.Factories.BodyFactory.CreateCircle(world, this.radius, 1.0);
                this._agentBody.Mass = 20.0;
                this._agentBody.BodyType = FarseerPhysics.Dynamics.BodyType.Dynamic;
                this._agentBody.Restitution = 0.5;
                this._agentBody.Position = position.$clone();
                var tex = screenManager.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "Assets/Ball");
                this.sprite = new FarseerPhysics.Utility.Sprite.$ctor1(tex);
            }
        },
        methods: {
            Draw: function () {
                this._batch.Draw$1(this.sprite.Texture, FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits(this._agentBody.Position.$clone()), null, Microsoft.Xna.Framework.Color.White.$clone(), this._agentBody.Rotation, this.sprite.Origin.$clone(), FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits$4(1.0) * this.radius * 2.0 / this.sprite.Texture.Width, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0.0);
            }
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
            _pyramid: null,
            agent: null,
            touchOn: null,
            touchOff: null,
            didPress: false
        },
        ctors: {
            init: function () {
                this.touchOn = new Microsoft.Xna.Framework.Vector2();
                this.touchOff = new Microsoft.Xna.Framework.Vector2();
                this.didPress = false;
            },
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
                this._pyramid = new FarseerPhysics.Samples.Pyramid(this.World, this.ScreenManager, new Microsoft.Xna.Framework.Vector2.$ctor2(15.0, 12.0), FarseerPhysics.Samples.Demos.DemoGameScreen.PyramidBaseBodyCount, 1.0);
                this.agent = new FarseerPhysics.Samples.Agent(this.World, this.ScreenManager, new Microsoft.Xna.Framework.Vector2.$ctor2(-15.0, 0.0));
                var body = FarseerPhysics.Factories.BodyFactory.CreateRectangle(this.World, 100.0, 20.0, 1.0);
                body.BodyType = FarseerPhysics.Dynamics.BodyType.Static;
                body.Friction = 2.0;
                body.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 26.3);

            },
            Update: function (gameTime, otherScreenHasFocus, coveredByOtherScreen) {
                var $t;
                FarseerPhysics.Utility.PhysicsGameScreen.prototype.Update.call(this, gameTime, otherScreenHasFocus, coveredByOtherScreen);
                var state = Microsoft.Xna.Framework.Input.Touch.TouchPanel.GetState();
                $t = Bridge.getEnumerator(state);
                try {
                    while ($t.moveNext()) {
                        var touch = $t.Current.$clone();
                        switch (touch.State) {
                            case Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Pressed: 
                                this.touchOn = touch.Position.$clone();
                                break;
                            case Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Released: 
                                var force = Microsoft.Xna.Framework.Vector2.op_Subtraction(this.touchOff.$clone(), this.touchOn.$clone());
                                this.agent.Body.ApplyForce(Microsoft.Xna.Framework.Vector2.Multiply$1(force.$clone(), 50.0));
                                break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            Draw: function (gameTime) {
                this.ScreenManager.SpriteBatch.Begin$1(0, null, null, null, null, null, null);
                this.ScreenManager.SpriteBatch.Draw$1(this.background, new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 0.0), null, Microsoft.Xna.Framework.Color.White.$clone(), 0.0, new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 0.0), 1.0, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0.0);
                this.ScreenManager.SpriteBatch.End();
                this.ScreenManager.SpriteBatch.Begin$1(0, null, null, null, null, null, this.Camera.View.$clone());
                this._pyramid.Draw();
                this.agent.Draw();
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYXJzZWVyUGh5c2ljcy5EZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBZ2VudC5jcyIsIkRlbW9HYW1lU2NyZWVuLmNzIiwiUGh5c2ljc0dhbWUuY3MiLCJQeXJhbWlkLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBYVlBLFdBQVlBLElBQUlBO1lBQ2hCQTs7Ozs7Ozs7Ozs7Ozs7b0JDa0JNQSxPQUFPQTs7Ozs7Ozs7OzRCQWhCSkEsT0FBYUEsZUFBNkJBOztnQkFFbkRBLGNBQVNBOztnQkFFVEEsa0JBQWFBLGtEQUF5QkEsT0FBT0E7Z0JBQzdDQTtnQkFDQUEsMkJBQXNCQTtnQkFDdEJBO2dCQUNBQSwyQkFBc0JBO2dCQUN0QkEsVUFBVUE7Z0JBRVZBLGNBQVNBLElBQUlBLHFDQUFPQTs7Ozs7Z0JBVXBCQSxtQkFBWUEscUJBQWdCQSxtREFBNEJBLG9DQUFzQkEsTUFBTUEsOENBQWFBLDBCQUFxQkEsNkJBQWVBLEFBQU9BLDREQUFrQ0Esb0JBQWNBLEFBQU9BLDJCQUFzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDYnZNQTs7eUVBQW9DQTs7Ozs7Z0JBTXREQTs7Z0JBRUFBLHFCQUFnQkEsSUFBSUE7Z0JBQ3BCQSxrQkFBYUE7Z0JBQ2JBLGdCQUFXQSxJQUFJQSwrQkFBUUEsWUFBT0Esb0JBQWVBLElBQUlBLG9EQUFtQkE7Z0JBQ3BFQSxhQUFRQSxJQUFJQSw2QkFBTUEsWUFBT0Esb0JBQWVBLElBQUlBLHVDQUFRQTtnQkFDcERBLFdBQVlBLHFEQUE0QkE7Z0JBQ3hDQSxnQkFBZ0JBO2dCQUNoQkE7Z0JBQ0FBLGdCQUFnQkEsSUFBSUE7Ozs4QkFJSUEsVUFBbUJBLHFCQUEwQkE7O2dCQUVyRUEscUVBQVlBLFVBQVVBLHFCQUFxQkE7Z0JBQzNDQSxZQUFZQTtnQkFDWkEsMEJBQXNCQTs7Ozt3QkFFbEJBLFFBQVFBOzRCQUVKQSxLQUFLQTtnQ0FDREEsZUFBVUE7Z0NBQ1ZBOzRCQUNKQSxLQUFLQTtnQ0FDREEsWUFBWUEsdUVBQVdBO2dDQUN2QkEsMkJBQXNCQSwyQ0FBaUJBO2dDQUN2Q0E7Ozs7Ozs7OzRCQTJCVUE7Z0JBRXRCQSwwQ0FBbUNBLE1BQU1BLE1BQU1BLE1BQU1BLE1BQU1BLE1BQU1BO2dCQUNqRUEsc0NBQStCQSxpQkFBWUEsSUFBSUEsa0RBQWlCQSxNQUFNQSxtREFBaUJBLElBQUlBLHVEQUFxQkE7Z0JBQ2hIQTtnQkFDQUEsMENBQW1DQSxNQUFNQSxNQUFNQSxNQUFNQSxNQUFNQSxNQUFNQTtnQkFDakVBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBLG1FQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQzdFVkEsaUJBQVlBLElBQUlBLDhDQUFzQkE7Z0JBR3RDQTtnQkFDQUE7Z0JBQ0FBOztnQkFFQUE7O2dCQUdBQSxxQkFBZ0JBLElBQUlBLHFDQUFjQTtnQkFDbENBLG9CQUFlQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFjZkE7O2dCQUVBQSxXQUFzQkEsSUFBSUEsNENBQWVBOzs7Z0JBR3pDQSw2QkFBd0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs0QkM3QmJBLE9BQWFBLGVBQTZCQSxVQUFrQkEsT0FBV0E7O2dCQUVsRkEsY0FBU0E7O2dCQUVUQSxXQUFnQkEsbURBQTZCQSxrQkFBWUE7Z0JBQ3pEQSxZQUFxQkEsSUFBSUEsb0RBQWFBLE1BQU1BOztnQkFFNUNBLGVBQW1CQTtnQkFDbkJBLGNBQWNBLE1BQU9BLFFBQVFBOztnQkFFN0JBLGVBQW1CQSxJQUFJQSx1Q0FBUUEsQ0FBQ0EsQ0FBQ0EseUJBQW9CQTtnQkFDckRBLGNBQWdCQTs7Z0JBRWhCQSxjQUFTQSxLQUFJQTs7Z0JBRWJBLEtBQUtBLFdBQVdBLElBQUlBLE9BQVNBO29CQUV6QkEsVUFBY0E7O29CQUVkQSxLQUFLQSxXQUFXQSxJQUFJQSxlQUFTQTt3QkFFekJBLFdBQVlBLGdEQUF1QkE7d0JBQ25DQSxnQkFBZ0JBO3dCQUNoQkEsZ0JBQWdCQTt3QkFDaEJBLG1CQUFtQkE7d0JBQ25CQSxnQkFBV0E7O3dCQUVYQSxTQUFTQTs7O29CQUdiQSwwRUFBWUE7OztnQkFHaEJBLFVBQVVBO2dCQUVWQSxZQUFPQSxJQUFJQSxxQ0FBT0E7Ozs7O2dCQUtsQkEsS0FBS0EsV0FBV0EsSUFBSUEsbUJBQWdCQTtvQkFFaENBLG1CQUFZQSxtQkFBY0EsbURBQTRCQSxvQkFBT0EsdUJBQWNBLE1BQU1BLDhDQUFhQSxvQkFBT0EsYUFBYUEsMkJBQWFBLEFBQU9BLDREQUFrQ0EsYUFBUUEsQUFBT0EseUJBQW9CQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLkRlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWUgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbiAgICAgICAgICAgIGdhbWUuUnVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQWdlbnRcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJvZHkgX2FnZW50Qm9keTtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZSBzcHJpdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGVCYXRjaCBfYmF0Y2g7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCByYWRpdXMgPSAxLjVmO1xyXG5cclxuICAgICAgICBwdWJsaWMgQWdlbnQoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaCA9IHNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2g7XHJcblxyXG4gICAgICAgICAgICBfYWdlbnRCb2R5ID0gQm9keUZhY3RvcnkuQ3JlYXRlQ2lyY2xlKHdvcmxkLCByYWRpdXMsIDFmKTtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5NYXNzID0gMjBmO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5LkJvZHlUeXBlID0gQm9keVR5cGUuRHluYW1pYztcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5SZXN0aXR1dGlvbiA9IDAuNWY7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHRleCA9IHNjcmVlbk1hbmFnZXIuQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJBc3NldHMvQmFsbFwiKTtcclxuICAgICAgICAgICAgLy9HRlhcclxuICAgICAgICAgICAgc3ByaXRlID0gbmV3IFNwcml0ZSh0ZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJvZHkgQm9keVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9hZ2VudEJvZHk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoLkRyYXcoc3ByaXRlLlRleHR1cmUsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cyhfYWdlbnRCb2R5LlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIF9hZ2VudEJvZHkuUm90YXRpb24sIHNwcml0ZS5PcmlnaW4sIChmbG9hdClDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogcmFkaXVzICogMmYgLyAoZmxvYXQpc3ByaXRlLlRleHR1cmUuV2lkdGgsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db2xsaXNpb24uU2hhcGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuVG91Y2g7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXMuRGVtb3Ncclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgRGVtb0dhbWVTY3JlZW4gOiBQaHlzaWNzR2FtZVNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IFB5cmFtaWRCYXNlQm9keUNvdW50ID0gMTQ7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0dXJlMkQgYmFja2dyb3VuZDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBQeXJhbWlkIF9weXJhbWlkO1xyXG4gICAgICAgIHByaXZhdGUgQWdlbnQgYWdlbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBWZWN0b3IyIHRvdWNoT24sIHRvdWNoT2ZmO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBkaWRQcmVzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgRGVtb0dhbWVTY3JlZW4oU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyKSA6IGJhc2Uoc2NyZWVuTWFuYWdlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBMb2FkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkxvYWRDb250ZW50KCk7XHJcblxyXG4gICAgICAgICAgICBXb3JsZC5HcmF2aXR5ID0gbmV3IFZlY3RvcjIoMGYsIDIwZik7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQgPSBTY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiQXNzZXRzL0JhY2tncm91bmRcIik7XHJcbiAgICAgICAgICAgIF9weXJhbWlkID0gbmV3IFB5cmFtaWQoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKDE1ZiwgMTJmKSwgUHlyYW1pZEJhc2VCb2R5Q291bnQsIDFmKTtcclxuICAgICAgICAgICAgYWdlbnQgPSBuZXcgQWdlbnQoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKC0xNWYsIDBmKSk7XHJcbiAgICAgICAgICAgIEJvZHkgYm9keSA9IEJvZHlGYWN0b3J5LkNyZWF0ZVJlY3RhbmdsZShXb3JsZCwgMTAwZiwgMjBmLCAxZik7XHJcbiAgICAgICAgICAgIGJvZHkuQm9keVR5cGUgPSBCb2R5VHlwZS5TdGF0aWM7XHJcbiAgICAgICAgICAgIGJvZHkuRnJpY3Rpb24gPSAyZjtcclxuICAgICAgICAgICAgYm9keS5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IyKDBmLCAyNi4zZik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEdhbWVUaW1lIGdhbWVUaW1lLCBib29sIG90aGVyU2NyZWVuSGFzRm9jdXMsIGJvb2wgY292ZXJlZEJ5T3RoZXJTY3JlZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShnYW1lVGltZSwgb3RoZXJTY3JlZW5IYXNGb2N1cywgY292ZXJlZEJ5T3RoZXJTY3JlZW4pO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBUb3VjaFBhbmVsLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0b3VjaCBpbiBzdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0b3VjaC5TdGF0ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRvdWNoTG9jYXRpb25TdGF0ZS5QcmVzc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9uID0gdG91Y2guUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVG91Y2hMb2NhdGlvblN0YXRlLlJlbGVhc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSB0b3VjaE9mZiAtIHRvdWNoT247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50LkJvZHkuQXBwbHlGb3JjZShWZWN0b3IyLk11bHRpcGx5KGZvcmNlLCA1MGYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuI2lmIFdJTkRPV1MgXHJcbiAgICAgICAgICAgIHZhciBtb3VzZSA9IE1vdXNlLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobW91c2UuTGVmdEJ1dHRvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdXR0b25TdGF0ZS5QcmVzc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlkUHJlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9uID0gbmV3IFZlY3RvcjIobW91c2UuUG9zaXRpb24uWCwgbW91c2UuUG9zaXRpb24uWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZFByZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1dHRvblN0YXRlLlJlbGVhc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWRQcmVzcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT2ZmID0gbmV3IFZlY3RvcjIobW91c2UuUG9zaXRpb24uWCwgbW91c2UuUG9zaXRpb24uWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IHRvdWNoT2ZmIC0gdG91Y2hPbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnQuQm9keS5BcHBseUZvcmNlKFZlY3RvcjIuTXVsdGlwbHkoZm9yY2UsIDUwZikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWRQcmVzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4jZW5kaWZcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIERyYXcoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkJlZ2luKDAsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkRyYXcoYmFja2dyb3VuZCwgbmV3IFZlY3RvcjIoMGYsIDBmKSwgbnVsbCwgQ29sb3IuV2hpdGUsIDBmLCBuZXcgVmVjdG9yMigwZiwgMGYpLCAxZiwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guRW5kKCk7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guQmVnaW4oMCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgQ2FtZXJhLlZpZXcpO1xyXG4gICAgICAgICAgICBfcHlyYW1pZC5EcmF3KCk7XHJcbiAgICAgICAgICAgIGFnZW50LkRyYXcoKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5FbmQoKTtcclxuICAgICAgICAgICAgYmFzZS5EcmF3KGdhbWVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXMuRGVtb3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoaXMgaXMgdGhlIG1haW4gdHlwZSBmb3IgeW91ciBnYW1lXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIFBoeXNpY3NHYW1lIDogR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyIF9ncmFwaGljcztcclxuXHJcbiAgICAgICAgcHVibGljIFBoeXNpY3NHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9ncmFwaGljcyA9IG5ldyBHcmFwaGljc0RldmljZU1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIC8vX2dyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJXaWR0aCA9IDE5MDA7XHJcbiAgICAgICAgICAgIC8vX2dyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJIZWlnaHQgPSAxMDAwO1xyXG4gICAgICAgICAgICBDb252ZXJ0VW5pdHMuU2V0RGlzcGxheVVuaXRUb1NpbVVuaXRSYXRpbygyNGYpO1xyXG4gICAgICAgICAgICBJc0ZpeGVkVGltZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgICAgICBfZ3JhcGhpY3MuSXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBDb250ZW50LlJvb3REaXJlY3RvcnkgPSBcIkNvbnRlbnRcIjtcclxuXHJcbiAgICAgICAgICAgIC8vbmV3LXVwIGNvbXBvbmVudHMgYW5kIGFkZCB0byBHYW1lLkNvbXBvbmVudHNcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlciA9IG5ldyBTY3JlZW5NYW5hZ2VyKHRoaXMpO1xyXG4gICAgICAgICAgICBDb21wb25lbnRzLkFkZChTY3JlZW5NYW5hZ2VyKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU2NyZWVuTWFuYWdlciBTY3JlZW5NYW5hZ2VyIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBbGxvd3MgdGhlIGdhbWUgdG8gcGVyZm9ybSBhbnkgaW5pdGlhbGl6YXRpb24gaXQgbmVlZHMgdG8gYmVmb3JlIHN0YXJ0aW5nIHRvIHJ1bi5cclxuICAgICAgICAvLy8gVGhpcyBpcyB3aGVyZSBpdCBjYW4gcXVlcnkgZm9yIGFueSByZXF1aXJlZCBzZXJ2aWNlcyBhbmQgbG9hZCBhbnkgbm9uLWdyYXBoaWNcclxuICAgICAgICAvLy8gcmVsYXRlZCBjb250ZW50LiAgQ2FsbGluZyBiYXNlLkluaXRpYWxpemUgd2lsbCBlbnVtZXJhdGUgdGhyb3VnaCBhbnkgY29tcG9uZW50c1xyXG4gICAgICAgIC8vLyBhbmQgaW5pdGlhbGl6ZSB0aGVtIGFzIHdlbGwuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0aWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgRGVtb0dhbWVTY3JlZW4gZGVtbyA9IG5ldyBEZW1vR2FtZVNjcmVlbihTY3JlZW5NYW5hZ2VyKTtcclxuXHJcblxyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLkFkZFNjcmVlbihkZW1vKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29sbGlzaW9uLlNoYXBlcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHlyYW1pZFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlIF9ib3g7XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PEJvZHk+IF9ib3hlcztcclxuICAgICAgICBwcml2YXRlIFNwcml0ZUJhdGNoIF9iYXRjaDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHdpZHRoID0gMS41ZjtcclxuICAgICAgICBwdWJsaWMgUHlyYW1pZChXb3JsZCB3b3JsZCwgU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyLCBWZWN0b3IyIHBvc2l0aW9uLCBpbnQgY291bnQsIGZsb2F0IGRlbnNpdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYmF0Y2ggPSBzY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoO1xyXG5cclxuICAgICAgICAgICAgVmVydGljZXMgcmVjdCA9IFBvbHlnb25Ub29scy5DcmVhdGVSZWN0YW5nbGUod2lkdGggLyAyZiwgd2lkdGggLyAyZik7XHJcbiAgICAgICAgICAgIFBvbHlnb25TaGFwZSBzaGFwZSA9IG5ldyBQb2x5Z29uU2hhcGUocmVjdCwgZGVuc2l0eSk7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IyIHJvd1N0YXJ0ID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHJvd1N0YXJ0LlkgLT0gMC41ZiArIGNvdW50ICogd2lkdGggKiAxLjFmO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMiBkZWx0YVJvdyA9IG5ldyBWZWN0b3IyKC0od2lkdGggKyAwLjJmKSAvIDJmLCB3aWR0aCArIDAuMWYpO1xyXG4gICAgICAgICAgICBmbG9hdCBzcGFjaW5nID0gd2lkdGggKyAwLjJmO1xyXG5cclxuICAgICAgICAgICAgX2JveGVzID0gbmV3IExpc3Q8Qm9keT4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiBwb3MgPSByb3dTdGFydDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGkgKyAxOyArK2opXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9keSBib2R5ID0gQm9keUZhY3RvcnkuQ3JlYXRlQm9keSh3b3JsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5Cb2R5VHlwZSA9IEJvZHlUeXBlLkR5bmFtaWM7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5Qb3NpdGlvbiA9IHBvcztcclxuICAgICAgICAgICAgICAgICAgICBib2R5LkNyZWF0ZUZpeHR1cmUoc2hhcGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9ib3hlcy5BZGQoYm9keSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBvcy5YICs9IHNwYWNpbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcm93U3RhcnQgKz0gZGVsdGFSb3c7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXggPSBzY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiQXNzZXRzL0JveFwiKTtcclxuICAgICAgICAgICAgLy9HRlhcclxuICAgICAgICAgICAgX2JveCA9IG5ldyBTcHJpdGUodGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBfYm94ZXMuQ291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2JhdGNoLkRyYXcoX2JveC5UZXh0dXJlLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoX2JveGVzW2ldLlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIF9ib3hlc1tpXS5Sb3RhdGlvbiwgX2JveC5PcmlnaW4sIChmbG9hdClDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogd2lkdGggLyAoZmxvYXQpX2JveC5UZXh0dXJlLldpZHRoLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K
