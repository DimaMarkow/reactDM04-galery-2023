import React from 'react';
import getPictures from 'services/getPictures';
import ErrorCard from '../ErrorCard/ErrorCard';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import LoadMore from 'components/LoadMore/LoadMore';
import { useState, useEffect } from 'react';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

const ContentInfo = ({ searchText }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [imageDetail, setImageDetail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchText === '') return;
    setPage(1);
    setImages([]);
    setStatus(STATUS.PENDING);
    try {
      fetchImagesFirstPage();
    } catch (error) {
      setError(error);
      setStatus(STATUS.REJECTED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    if (page !== 1) {
      setStatus(STATUS.PENDING);
      try {
        fetchImages();
      } catch (error) {
        setError(error);
        setStatus(STATUS.REJECTED);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchImages = async () => {
    const newImages = await getPictures(searchText, page);
    setImages(prevImages => [...prevImages, ...newImages]);
    setStatus(STATUS.RESOLVED);
  };

  const fetchImagesFirstPage = async () => {
    const newImages = await getPictures(searchText, 1);
    setImages(prevImages => [...prevImages, ...newImages]);
    setStatus(STATUS.RESOLVED);
  };

  const showImage = ({ largeImageURL }) => {
    setImageDetail(largeImageURL);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  const onLoadMore = () => setPage(prevPage => prevPage + 1);

  if (status === STATUS.PENDING)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  else if (status === STATUS.RESOLVED)
    return (
      <>
        <ImageGalleryItem images={images} showImage={showImage} />
        <LoadMore onLoadMore={onLoadMore} />
        {showModal && (
          <Modal imageDetail={imageDetail} closeModal={closeModal} />
        )}
      </>
    );
  else if (status === STATUS.REJECTED)
    return <ErrorCard>{error.response.data}</ErrorCard>;
};

export default ContentInfo;
