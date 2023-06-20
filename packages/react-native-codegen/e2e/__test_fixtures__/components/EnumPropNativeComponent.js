/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

import type {WithDefault} from 'react-native/Libraries/Types/CodegenTypes';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';

type NativeProps = $ReadOnly<{|
  ...ViewProps,

  // Props
  alignment?: WithDefault<'top' | 'center' | 'bottom-right', 'center'>,
  intervals?: WithDefault<0 | 15 | 30 | 60, 0>,
|}>;

export default (codegenNativeComponent<NativeProps>(
  'EnumPropNativeComponentView',
): HostComponent<NativeProps>);