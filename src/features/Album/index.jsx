import React from 'react';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {

};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Âm Nhạc Dành Cho Bạn',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/7/9/e/8/79e8ee6cf0e8a2585ab510d4dd9a33e0.jpg'
        },
        {
            id: 2,
            name: 'Âm Nhạc Dành Cho Bạn',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/7/9/e/8/79e8ee6cf0e8a2585ab510d4dd9a33e0.jpg'
        },
        {
            id: 3,
            name: 'Âm Nhạc Dành Cho Bạn',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/7/9/e/8/79e8ee6cf0e8a2585ab510d4dd9a33e0.jpg'
        },
        {
            id: 4,
            name: 'Âm Nhạc Dành Cho Bạn',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/7/9/e/8/79e8ee6cf0e8a2585ab510d4dd9a33e0.jpg'
        },

    ];

    return (
        <div>
            <h2>Có thể bạn sẽ thích đấy</h2>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;