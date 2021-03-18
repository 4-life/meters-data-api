export enum MetricEnum {
  delta0 = 'delta0',
  delta1 = 'delta1',
  good = 'good',
  boot = 'boot',
  ch0 = 'ch0',
  ch1 = 'ch1',
  imp0 = 'imp0',
  imp1 = 'imp1',
  version = 'version',
  voltage = 'voltage',
  version_esp = 'version_esp',
  key = 'key',
  resets = 'resets',
  voltage_low = 'voltage_low',
  voltage_diff = 'voltage_diff',
  rssi = 'rssi'
}

export interface Metric {
  readonly [MetricEnum.delta0]: number;
  readonly [MetricEnum.delta1]: number;
  readonly [MetricEnum.good]: number;
  readonly [MetricEnum.boot]: number;
  readonly [MetricEnum.ch0]: number;
  readonly [MetricEnum.ch1]: number;
  readonly [MetricEnum.imp0]: number;
  readonly [MetricEnum.imp1]: number;
  readonly [MetricEnum.version]: number;
  readonly [MetricEnum.voltage]: number;
  readonly [MetricEnum.version_esp]: string;
  readonly [MetricEnum.key]: string;
  readonly [MetricEnum.resets]: number;
  readonly [MetricEnum.voltage_low]: boolean;
  readonly [MetricEnum.voltage_diff]: number;
  readonly [MetricEnum.rssi]: number;
}

export interface MetricData extends Metric {
  readonly date: Date;
}
