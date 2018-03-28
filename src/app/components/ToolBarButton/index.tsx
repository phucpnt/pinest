import React from 'react';
import { Ripples } from 'nersent-ui';
import { observer } from 'mobx-react'; // eslint-disable-line

// Enums
import { Icons } from '../../enums';

import { Button, Icon } from './styles';

import Store from '../../store';

interface IProps {
  onClick?: (e?: React.SyntheticEvent<HTMLDivElement>) => void;
  size?: number;
  style?: any;
  icon: Icons;
  innerRef?: (ref: HTMLDivElement) => void;
}

@observer
export default class ToolBarButton extends React.PureComponent<IProps, {}> {
  public static defaultProps = {
    size: 20,
  };

  private ripples: Ripples;

  public onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.ripples.makeRipple(e.pageX, e.pageY);
  };

  public onMouseUp = () => {
    this.ripples.removeRipples();
  };

  public render() {
    const {
      icon, onClick, size, style,
    } = this.props;

    Store.theme.toolbar;

    return (
      <Button
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onClick={onClick}
        style={style}
        innerRef={this.props.innerRef}
        theme={Store.theme}
      >
        <Icon icon={icon} size={size} />
        <Ripples
          icon
          ref={r => (this.ripples = r)}
          color="#000"
          parentWidth={42}
          parentHeight={48}
          rippleTime={0.6}
          initialOpacity={0.1}
        />
      </Button>
    );
  }
}
