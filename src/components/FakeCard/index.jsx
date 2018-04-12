import React from 'react';
import './index.scss';


class FakeCard extends React.Component {
  render() {
    return (
      <div className="FakeCard">
        <span className="icon-card-wireframe">
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
          <span className="path4" />
          <span className="path5" />
        </span>
      </div>
    );
  }
}

export default FakeCard;