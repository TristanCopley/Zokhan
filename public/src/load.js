class Assets {

    constructor() {

        this.finished = false;

        this.assetsCached = 0;

        this.miscToLoad = [

            ['cursor', 'mouse/cursor.png']

        ];

        this.totalAssets = 2; // Manually updated

    }

    cacheAllAssets() {

        /*// Cache legend sprites
        for (let i = 0; i < legendsData.length; i++) {

            this[legendsData[i].id] = [];

            for (let x = 0; x < legendsData[i].sprites.length; x++) {

                this[legendsData[i].id][legendsData[i].sprites[x][0]] = [];

                for (let y = 0; y < legendsData[i].sprites[x][1]; y++) {

                    let image = new Image();
                    image.src = '../assets/legends/' + legendsData[i].id + '/' + legendsData[i].sprites[x][0] + '/' + legendsData[i].sprites[x][0] + '_' + y + '.png';
                    image.onload = function() {

                        this.assetsCached += 1;

                    }

                    this[legendsData[i].id][legendsData[i].sprites[x][0]].push(image);

                }

            }

        }

        // Cache stages sprites
        for (let i = 0; i < levelsData.length; i++) {

            this[levelsData[i].id] = [];

            for (let x = 0; x < levelsData[i].sprites.length; x++) {

                this[levelsData[i].id][levelsData[i].sprites[x][0]] = [];

                for (let y = 0; y < levelsData[i].sprites[x][1]; y++) {

                    let image = new Image();
                    image.src = '../assets/levels/' + levelsData[i].id + '/' + levelsData[i].sprites[x][0] + '/' + levelsData[i].sprites[x][0] + '_' + y + '.png';
                    image.onload = function() {

                        this.assetsCached += 1;

                    }

                    this[levelsData[i].id][levelsData[i].sprites[x][0]].push(image);

                }

            }

        }*/


        // Cache misc sprites
        this['misc'] = [];
        for (let i = 0; i < this.miscToLoad.length; i++) {

            let image = new Image();
            image.src = '../assets/' + this.miscToLoad[i][1];
            image.onload = function() {

                this.assetsCached += 1;

            }

            this['misc'][this.miscToLoad[i][0]] = image;

        }
        
        console.log(this);
        this.finished = true;

    }

}
